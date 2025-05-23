# AGS-AI 🤖

AGS-AI is a full-stack AI chatbot web app built with the MERN stack (MongoDB, Express, React, Node.js) and powered by the OpenAI API. It allows users to chat in real time with an AI assistant — great for learning, coding help, or general knowledge.

## 🚀 Features

- 🔐 **Authentication & Security**
  - Secure signup and login with JWT
  - Auth tokens stored in HTTP-only cookies
  - Auto-redirect for unauthenticated users
  - Token validation on every reload

- 💬 **AI Chat System**
  - Real-time chat with OpenAI
  - Persistent chat history stored in MongoDB
  - Option to clear chat with one click
  - Supports code block rendering for technical conversations

- 🔁 **Reload-Friendly**
  - Checks and restores sessions on page reload
  - Loads chat history if authenticated

- 🖥️ **Frontend**
  - Built with React + TypeScript
  - Material UI for clean, responsive design
  - Pages: Home, Login, Signup, Chat, and 404 fallback
  - Dynamic navigation based on login status

- 🔧 **Backend**
  - Node.js + Express with TypeScript
  - Secure OpenAI API integration
  - MongoDB Atlas for storing users and messages
  - API routes for login, signup, chat, and chat deletion
  - Robust error handling

- 📡 **Dev Setup**
  - Vite for frontend dev server
  - Runs on separate ports with CORS and credentials configured

## 🧠 What I Learned

- Implementing secure JWT-based authentication
- Real-time integration with OpenAI’s API
- Building production-ready, reload-safe apps
- Creating smooth user flows and scalable codebases

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Material UI, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas
- **Auth:** JWT, HTTP-only cookies
- **AI:** OpenAI API

## 📦 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account
- OpenAI API key

## Backend
 ## npm install
 ## Create a .env file and add:
##  MONGO_URI=your_mongo_uri
 ## OPENAI_API_KEY=your_openai_key
 ## JWT_SECRET=your_jwt_secret
## npm run dev
================
## Frontend
## npm install
## npm run dev

## Note:
## Make sure both frontend and backend are running on different ports. CORS and credentials are already configured.
