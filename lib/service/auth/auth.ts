import { User } from "@/types";
import { JwtPayload } from "./JWTPayload";
import { jwtDecode } from "jwt-decode";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook"

const BASE_URL = `${NEXT_PUBLIC_API_URL}/Auth`;

export const register = async (
    fullName: string,
    email: string,
    username: string,
    password: string,
    phoneNumber: string,
    address: string,
): Promise<{
    success: boolean;
    error?: string;
}> => {
    try {
        const response = await fetch(`${BASE_URL}/register-parent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    username,
                    password,
                    phoneNumber,
                    address,
                }),
            }
        );
        const data = await response.json();
        if (data.success) {
            return { success: true };
        }
        return {
            success: false,
            error: data.message || "Registration failed"
        };
    } catch (error) {
        console.error("Register failed:", error);
        return { success: false };
    }
};

export const authenticate = async (
    email: string,
    password: string
): Promise<{
    success: boolean;
    user?: User;
    token?: string;
    error?: string;
}> => {
    try {
        const response = await fetch(`${BASE_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                },
                body: JSON.stringify({
                    email,
                    password,
                    rememberMe: true,
                }),
            });
        const data = await response.json();
        if (data.success && data.data && data.data.success && data.data.token) {
            const decodedToken: JwtPayload = jwtDecode(data.data.token);
            const roleFromToken = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            const normalizedRole: User["role"] = roleFromToken.toLowerCase() as User["role"];
            const mappedUser: User = {
                id: decodedToken.sub.toString(),
                name: decodedToken.email || "Unknown",
                userId: parseInt(decodedToken.UserId, 10),
                parentId: parseInt(decodedToken.ParentId, 10),
                email: decodedToken.email,
                phoneNumber: "",
                role: normalizedRole,
                avatar: undefined,
                createdAt: new Date(),
            };
            return {
                success: true,
                user: mappedUser,
                token: data.data.token,
            };
        }
        return { success: false, error: data.message || "Login failed" };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false };
    }
};

export const changePassword = async (
    userId: number,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
): Promise<{
    success: boolean;
    message?: string;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return { success: false, error: "No authentication token found" };
        }

        const response = await fetch(`${BASE_URL}/change-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId,
                    currentPassword,
                    newPassword,
                    confirmPassword,
                }),
            });
        const data = await response.json();
        if (data.success) {
            return {
                success: true,
                message: data.message || "Password changed successfully",
            };
        }
        return {
            success: false,
            error: data.errorMessage || "Failed to change password",
        };
    } catch (error) {
        console.error("Password change failed:", error);
        if (error instanceof SyntaxError) {
            return {
                success: false,
                error: "Invalid response from server",
            };
        }
        return {
            success: false,
            error: "An error occurred while changing the password",
        };
    }
};