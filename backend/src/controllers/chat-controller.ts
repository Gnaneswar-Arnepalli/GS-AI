import { NextFunction, Request, Response } from "express";
import User from "../models/user-model.js";
import { configureOpenAI } from "../config/openai-config.js";
import axios from "axios";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ 
        message: "User not registered OR Token malfunctioned" 
      });
    }

    // Prepare chats - simplified type usage
    const chats = user.chats.map(({ role, content }) => ({
      role: role as "user" | "assistant", // Simplified type assertion
      content,
    }));
    chats.push({ content: message, role: "user" });

    // Get response from OpenRouter
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo", // Using OpenRouter's model name
        messages: chats,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPEN_AI_SECRET}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'My Chat App',
          'Content-Type': 'application/json'
        }
      }
    );

    // Update user chats
    user.chats.push({ content: message, role: "user" });
    
    // Handle OpenRouter's response format
    const assistantMessage = response.data.choices[0].message;
    user.chats.push({
      content: assistantMessage.content,
      role: "assistant"
    });
    
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    
    // Specific error handling for OpenRouter
    if (error.response?.data?.error?.type === 'insufficient_quota') {
      return res.status(429).json({ 
        message: "Free quota exhausted",
        suggestion: "Please try again later or use a different model"
      });
    }
    
    return res.status(500).json({ 
      message: "API Error",
      error: error.response?.data?.error?.message || error.message 
    });
  }
};

// Keep these functions exactly the same as they don't interact with OpenAI
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};