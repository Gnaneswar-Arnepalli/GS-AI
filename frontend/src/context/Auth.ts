// Auth.ts
import { useContext } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";

export const useAuth = () => useContext(AuthContext);
export { AuthProvider };


// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
