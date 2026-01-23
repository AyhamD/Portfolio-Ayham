import { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/authService";
import type { AuthContextType } from "../interface/interfaces";
import type { User } from "../interface/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await authAPI.verify();
      setIsAuthenticated(true);
      setUser({ email: response.data.email, id: response.data.id });
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem("admin_token", response.data.token);
      setIsAuthenticated(true);
      setUser({
        email,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await authAPI.register(email, password);
      localStorage.setItem("admin_token", response.data.token);
      setIsAuthenticated(true);
      setUser({
        email,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
