import type { User } from "@/types";
import type { ApiUser } from "./IUser";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Users`;

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        accept: "*/*",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

const mapApiUserToUser = (apiUser: ApiUser): User => ({
    id: apiUser.id?.toString() || "",
    name: apiUser.username,
    email: apiUser.email,
    phoneNumber: apiUser.phoneNumber || "",
    avatar: undefined,
    createdAt: apiUser.createdAt ? new Date(apiUser.createdAt) : new Date(),
    role: apiUser.role === 0 ? "parent" : apiUser.role === 1 ? "schoolnurse" : "admin",
});

const fetchUser = async (url: string): Promise<User | null> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("Fetch user error:", data.message || "Fetch user failed");
            return null;
        }

        return Array.isArray(data) ? (data.length > 0 ? mapApiUserToUser(data[0]) : null) : mapApiUserToUser(data);
    } catch (error) {
        console.error("Fetch user error:", error);
        return null;
    }
};

export const getUserById = (id: number): Promise<User | null> =>
    fetchUser(`${API_URL}/${id}`);

export const getUsersByRole = async (role: string): Promise<User[] | null> => {
    try {
        const response = await fetch(`${API_URL}/roles/${role}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error("Fetch users by role error:", data.message || "Fetch users by role failed");
            return null;
        }

        return Array.isArray(data) ? data.map(mapApiUserToUser) : [];
    } catch (error) {
        console.error("Fetch users by role error:", error);
        return null;
    }
};

export const createUser = async (
    email: string,
    username: string,
    password: string,
    role: number,
    phoneNumber: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ email, username, password, role, phoneNumber }),
        });

        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.message || "Create user failed";
            console.error("Create user error:", errorMessage);
            return { success: false, error: errorMessage };
        }

        return { success: true, user: mapApiUserToUser(data) };
    } catch (error) {
        console.error("Create user error:", error);
        return { success: false, error: String(error) };
    }
};

export const updateUser = async (
    id: number,
    email: string,
    username: string,
    password: string,
    role: number,
    phoneNumber: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ id, email, username, password, role, phoneNumber }),
        });

        const data = await response.json();
        if (!response.ok) {
            const errorMessage = data.message || "Update user failed";
            console.error("Update user error:", errorMessage);
            return { success: false, error: errorMessage };
        }

        return { success: true, user: mapApiUserToUser(data) };
    } catch (error) {
        console.error("Update user error:", error);
        return { success: false, error: String(error) };
    }
};

export const deleteUser = async (
    id: number
): Promise<{ success: boolean; error?: string }> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            const text = await response.text();
            const errorMessage = text || "Delete user failed";
            console.error("Delete user error:", errorMessage);
            return { success: false, error: errorMessage };
        }

        return { success: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return { success: false, error: String(error) };
    }
};
