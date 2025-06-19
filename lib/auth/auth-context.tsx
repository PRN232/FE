"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "@/types";
import {mockUsers} from "@/lib/data/mock-data";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (foundUser && password && password.length >= 6) {
            const loggedInUser: User = { ...foundUser, createdAt: new Date() };

            setUser(loggedInUser);
            localStorage.setItem("user", JSON.stringify(loggedInUser));
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
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