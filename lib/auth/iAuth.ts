import type {User} from "@/types";
import {ApiMedicalProfile} from "@/lib/service/medicalProfile/IMedical";

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    change: (
        userId: number,
        currentPassword: string,
        newPassword: string,
        confirmPassword: string
    ) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
    error: string | null;
    create: (
        email: string,
        username: string,
        password: string,
        role: number,
        phoneNumber: string
    ) => Promise<boolean>;
    update: (
        id: number,
        email: string,
        username: string,
        password: string,
        role: number,
        phoneNumber: string
    ) => Promise<boolean>;
    del: (id: number) => Promise<boolean>;
    ParentId: (userId: number) => Promise<{
        success: boolean;
        parent?: User;
        children?: User[];
        error?: string;
    }>;
    ChildrenParentId: (parentId: number) => Promise<{
        success: boolean;
        children?: User[];
        error?: string;
    }>;
    StudentId: (studentId: number) => Promise<{
        success: boolean;
        student?: User;
        error?: string;
    }>;
    StudentClass: (className: string) => Promise<{
        success: boolean;
        students?: User[];
        error?: string;
    }>;
    StudentParentId: (parentId: number) => Promise<{
        success: boolean;
        students?: User[];
        error?: string;
    }>;
    StudentProfile: (studentId: number) => Promise<{
        success: boolean;
        profile?: ApiMedicalProfile;
        error?: string;
    }>;
}