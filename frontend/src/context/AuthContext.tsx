import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  LogoutUser,
  signupUser,
} from "../helpers/api-communication";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  Login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  Logout: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      setIsLoading(true);
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      } catch (error: any) {
        if (error.message === "Session expired. Please login again.") {
          setIsLoggedIn(false);
          setUser(null);
        } else if (error.code === 'ERR_NETWORK') {
          console.error('Network Error:', error.message);
        } else {
          console.error('Error checking auth status:', error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    checkStatus();
  }, []);

  const Login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await signupUser(name, email, password);
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
    } catch (error) {
      throw error;
    }
  };

  const Logout = async () => {
    try {
      await LogoutUser();
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    
    isLoggedIn,
    isLoading,
    Login,
    Logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};