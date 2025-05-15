import { ReactNode, createContext, useEffect, useState } from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helpers/api-communication";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null; // Add token to context
  Login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null); // Add token state

  useEffect(() => {
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
        setToken(localStorage.getItem("token")); // Retrieve stored token
      }
    }
    checkStatus();
  }, []);

  const Login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
       setToken(data.token); // Store token from API response
      localStorage.setItem("token", data.token); // Persist token
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const data = await signupUser(name, email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    }
  };

  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
     token,
    Login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
