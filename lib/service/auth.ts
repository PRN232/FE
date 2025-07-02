import type { User } from "@/types";

export const authenticate = async (email: string, password: string):
    Promise<{
    success: boolean;
    user?: User;
    token?: string
}> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "*/*",
            },
            body: JSON.stringify({ email, password, rememberMe: true }),
        });
        const data = await response.json();
        if (data.success) {
            const mappedUser: User = {
                id: data.user.id.toString(),
                name: data.user.username,
                email: data.user.email,
                role: data.user.role === 0 ? "parent" : data.user.role === 1 ? "medical_staff" : "admin",
                avatar: undefined,
                createdAt: new Date(data.user.createdAt),
            };
            return { success: true, user: mappedUser, token: data.token };
        }
        return { success: false };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false };
    }
};