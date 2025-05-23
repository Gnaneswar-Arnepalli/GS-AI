import { OpenAI } from "openai";

export const configureOpenAI = () => {
  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY!,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:5000/api/v1", // Replace with your actual frontend domain in prod
      "X-Title": "MERN-AI Chatbot"
    },
  });

  return openai;
};