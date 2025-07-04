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
  authenticate,
  changePassword,
} from "@/lib/service/auth/auth";
import {
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/service/user/user";
import {
  getParentByUserId,
  getChildrenByParentId,
} from "@/lib/service/parent/parent";
import {
  getStudentById,
  getStudentsByClass,
  getStudentsByParentId,
} from "@/lib/service/student/student";
import {
  getMedicalProfileByStudentId
} from "@/lib/service/medicalProfile/medical";
import {AuthContextType} from "./iAuth";
import {ApiMedicalProfile} from "@/lib/service/medicalProfile/IMedical";

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

  const login = async (
      email:
      string,
      password: string
  ): Promise<boolean> => {
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

  const create = async (
      email: string,
      username: string,
      password: string,
      role: number,
      phoneNumber: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    const result = await createUser(
        email,
        username,
        password,
        role,
        phoneNumber
    );
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

    const result = await updateUser(
        id,
        email,
        username,
        password,
        role,
        phoneNumber
    );
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

  const del = async (
      id: number
  ): Promise<boolean> => {
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

  const ParentId = async (userId: number): Promise<{
    success: boolean;
    parent?: User;
    children?: User[];
    error?: string;
  }> => {
    setIsLoading(true);
    setError(null);
    const result = await getParentByUserId(userId);
    if (result.success) {
      setIsLoading(false);
      return result;
    }
    setError(result.error || "Failed to fetch parent data");
    setIsLoading(false);
    return result;
  };

  const ChildrenParentId = async (parentId: number): Promise<{
    success: boolean;
    children?: User[];
    error?: string;
  }> => {
    setIsLoading(true);
    setError(null);
    const result = await getChildrenByParentId(parentId);
    if (result.success) {
      setIsLoading(false);
      return result;
    }
    setError(result.error || "Failed to fetch children data");
    setIsLoading(false);
    return result;
  };

  const StudentId = async (studentId: number): Promise<{
    success: boolean;
    student?: User;
    error?: string;
  }> => {
    setIsLoading(true);
    setError(null);
    const result = await getStudentById(studentId);
    if (result.success) {
      setIsLoading(false);
      return result;
    }
    setError(result.error || "Failed to fetch student");
    setIsLoading(false);
    return result;
  };

  const StudentClass = async (className: string): Promise<{
    success: boolean;
    students?: User[];
    error?: string;
  }> => {
    setIsLoading(true);
    setError(null);
    const result = await getStudentsByClass(className);
    if (result.success) {
      setIsLoading(false);
      return result;
    }
    setError(result.error || "Failed to fetch students by class");
    setIsLoading(false);
    return result;
  };

  const StudentParentId = async (parentId: number): Promise<{
    success: boolean;
    students?: User[];
    error?: string;
  }> => {
    setIsLoading(true);
    setError(null);
    const result = await getStudentsByParentId(parentId);
    if (result.success) {
      setIsLoading(false);
      return result;
    }
    setError(result.error || "Failed to fetch students by parent");
    setIsLoading(false);
    return result;
  };

  const StudentProfile = async (studentId: number): Promise<{
    success: boolean;
    profile?: ApiMedicalProfile;
    error?: string;
  }> => {
    setIsLoading(true);
    setError(null);
    const result = await getMedicalProfileByStudentId(studentId);
    if (result.success) {
      setIsLoading(false);
      return result;
    }
    setError(result.error || "Failed to fetch medical profile");
    setIsLoading(false);
    return result;
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    change,
    create,
    update,
    del,
    ParentId,
    ChildrenParentId,
    StudentId,
    StudentClass,
    StudentParentId,
    StudentProfile,
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