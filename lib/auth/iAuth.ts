import type {User} from "@/types";

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signup: (
        fullName: string,
        email: string,
        username: string,
        password: string,
        phoneNumber: string,
        address: string,
    ) => Promise<{
        success: boolean;
        error?: string;
    }>;
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
}