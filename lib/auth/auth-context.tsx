"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "@/types";
import {
  register,
  authenticate,
  changePassword,
} from "@/lib/service/auth/auth";
import {
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/service/user/user";
import { AuthContextType } from "./iAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (
      fullName: string,
      email: string,
      username: string,
      password: string,
      phoneNumber: string,
      address: string
  ): Promise<{
    success: boolean;
    error?: string
  }> => {
    setIsLoading(true);
    setError(null);
    const result = await register(
        fullName,
        email,
        username,
        password,
        phoneNumber,
        address
    );
    if (result.success) {
      setIsLoading(false);
      return { success: true };
    }
    setError(result.error || "Failed to register user");
    setIsLoading(false);
    return { success: false, error: result.error || "Failed to register user" };
  };

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
    setError(result.error || "Invalid email or password");
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const change = async (
      userId: number,
      currentPassword: string,
      newPassword: string,
      confirmPassword: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const result = await changePassword(userId, currentPassword, newPassword, confirmPassword);
    if (result.success) {
      setIsLoading(false);
      return true;
    }
    setError(result.error || "Failed to change password");
    setIsLoading(false);
    return false;
  };

  const create = async (
      email: string,
      username: string,
      password: string,
      role: number,
      phoneNumber: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const result = await createUser(email, username, password, role, phoneNumber);
    if (result.success && result.user) {
      setIsLoading(false);
      return true;
    }
    setError(result.error || "Failed to create user");
    setIsLoading(false);
    return false;
  };

  const update = async (
      id: number,
      email: string,
      username: string,
      password: string,
      role: number,
      phoneNumber: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const result = await updateUser(id, email, username, password, role, phoneNumber);
    if (result.success && result.user) {
      setIsLoading(false);
      if (user?.id === id.toString()) {
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
      }
      return true;
    }
    setError(result.error || "Failed to update user");
    setIsLoading(false);
    return false;
  };

  const del = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const result = await deleteUser(id);
    if (result.success) {
      if (user?.id === id.toString()) {
        logout();
      }
      setIsLoading(false);
      return true;
    }
    setError(result.error || "Failed to delete user");
    setIsLoading(false);
    return false;
  };

  const value = {
    user,
    isLoading,
    signup,
    login,
    logout,
    change,
    create,
    update,
    del,
    isAuthenticated: !!user,
    error,
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