"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import type { User } from "@/types";
import { authenticate, changePassword } from "@/lib/service/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  passwordChange: (
      userId: number,
      currentPassword: string,
      newPassword: string,
      confirmPassword: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const result = await authenticate(email, password);
    if (result.success && result.user && result.token) {
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      setIsLoading(false);
      return true;
    }
    setError("Invalid email or password");
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const passwordChange = async (
      userId: number,
      currentPassword: string,
      newPassword: string,
      confirmPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const result = await changePassword(
        userId,
        currentPassword,
        newPassword,
        confirmPassword
    );
    if (result.success) {
      setIsLoading(false);
      return true;
    }
    setError(result.error || "Failed to change password");
    setIsLoading(false);
    return false;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    passwordChange,
    isAuthenticated: !!user,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};