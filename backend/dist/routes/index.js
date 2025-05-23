import { Router } from "express";
import userRoutes from "./user-router.js";
import chatRoutes from "./chat-router.js";
const appRouter = Router();
appRouter.use("/user", userRoutes); //domain/api/v1/user
appRouter.use("/chat", chatRoutes); //domain/api/v1/chats
appRouter.use("/all-chats", chatRoutes); //domain/api/v1/all-chats
export default appRouter;
//# sourceMappingURL=index.js.map