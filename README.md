<!-- Failed to upload "MERN_AI.mp4" -->


# GS-AI Chat Platform
A production-ready AI chatbot platform with advanced authentication, built using the MERN stack and TypeScript. This project offers a ChatGPT-like interface, integrating OpenRouter's GPT-3.5 Turbo API, and is deployed with Vercel (frontend) and Render (backend).

🚀 Project Description
GS-AI Chat is a full-stack AI chatbot platform developed with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript. Designed as a SaaS application, it features:

🔒 Advanced Authentication System:

=>JWT token-based authorization
=>HTTP-only cookies for secure session management
=>Protected routes with middleware validation

💬 ChatGPT-like Functionality:

=>Interactive chat interface with code highlighting
=>Conversation history persistence in MongoDB



✨ Key Features:

=>Complete user authentication (signup/login/logout)
=>Responsive Material UI design
=>Rate limiting and API security
=>Type-safe full-stack implementation
=>End-to-end encrypted communications
=>This project serves both as a production-ready SaaS template and an educational resource for building secure, scalable full-stack applications with modern web technologies.

🛠️ Technologies Used
Category	                     Technologies
Frontend	                     React, TypeScript, Vite, Material UI, React Syntax Highlighter
Backend	                       Node.js, Express, TypeScript, MongoDB, Mongoose
Authentication	               JWT, HTTP-Only Cookies, bcrypt
AI Integration	               OpenRouter API (GPT-3.5 Turbo)
DevOps	                       Render (Backend), Vercel (Frontend)
APIs	                         RESTful API, Axios
Styling	                       CSS-in-JS (Material UI), Responsive Design

🔐 Authentication Flow

=> Signup/Login: Users can register and log in using their credentials.
=> JWT Tokens: Upon successful authentication, a JWT token is issued and stored in an HTTP-only cookie.
=> Protected Routes: Certain routes are protected and require a valid JWT token to access.
=> Logout: Clears the JWT token from the cookie, effectively logging the user out.

🤖 OpenAI Integration via OpenRouter
The chatbot leverages OpenAI's GPT-3.5 Turbo model through the OpenRouter API to generate responses based on user input. Ensure you have a valid API key from OpenRouter and have set it in the .env file.

📄 License 
=> This project is licensed under the MIT License.

🙌 Acknowledgements

=>OpenRouter for providing access to GPT-3.5 Turbo.
=>Material UI for the sleek UI components.
=>Express Validator for input validation.


