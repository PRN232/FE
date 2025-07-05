import type { User } from "@/types";
import type { ApiUser } from "./IUser";

const mapApiUserToUser = (
    apiUser: ApiUser
): User => ({
    id: apiUser.id?.toString() || "",
    name: apiUser.username,
    email: apiUser.email,
    phoneNumber: apiUser.phoneNumber || "",
    avatar: undefined,
    createdAt: apiUser.createdAt ? new Date(apiUser.createdAt) : new Date(),
    role: apiUser.role === 0 ? "parent" : apiUser.role === 1 ? "medical_staff" : "admin",
});

const fetchUser = async (
    url: string
): Promise<User | null> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                accept: "*/*",
            },
        });
        const data = await response.json();
        if (response.ok) {
            if (Array.isArray(data)) {
                return data.length > 0 ? mapApiUserToUser(data[0]) : null;
            }
            return mapApiUserToUser(data);
        }
        console.error("Fetch failed:", await response.text());
        return null;
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
};

export const getUserById = async (
    id: number
): Promise<User | null> => {
    return fetchUser(
        `${process.env.NEXT_PUBLIC_API_URL}/Users/${id}`
    );
};

export const getUsersByRole = async (
    role: string
): Promise<User[] | null> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Users/roles/${role}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                },
            });
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
            return data.map((apiUser: ApiUser) => mapApiUserToUser(apiUser));
        }
        console.error("Fetch failed:", await response.text());
        return null;
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
};

export const createUser = async (
    email: string,
    username: string,
    password: string,
    role: number,
    phoneNumber: string
): Promise<{
    success: boolean;
    user?: User;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    role,
                    phoneNumber
                }),
            });

        if (!response.ok) {
            const text = await response.text();
            console.error("Create user failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data) {
            const mappedUser: User = mapApiUserToUser(data);
            return {
                success: true,
                user: mappedUser
            };
        }
        return {
            success: false,
            error: "No user data returned"
        };
    } catch (error) {
        console.error("Create user error:", error);
        return {
            success: false,
            error: "An error occurred while creating the user"
        };
    }
};

export const updateUser = async (
    id: number,
    email: string,
    username: string,
    password: string,
    role: number,
    phoneNumber: string
): Promise<{
    success: boolean;
    user?: User;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Users/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            body: JSON.stringify({
                id,
                email,
                username,
                password,
                role,
                phoneNumber
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Update user failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data) {
            const mappedUser: User = mapApiUserToUser(data);
            return {
                success: true,
                user: mappedUser
            };
        }
        return {
            success: false,
            error: "No user data returned"
        };
    } catch (error) {
        console.error("Update user error:", error);
        return {
            success: false,
            error: "An error occurred while updating the user"
        };
    }
};

export const deleteUser = async (
    id: number
): Promise<{
    success: boolean;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Users/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

        if (!response.ok) {
            const text = await response.text();
            console.error("Delete user failed:", text);
            return { success: false, error: `HTTP Error: ${response.status} - ${text || "Unknown error"}` };
        }

        return { success: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return {
            success: false,
            error: "An error occurred while deleting the user"
        };
    }
};