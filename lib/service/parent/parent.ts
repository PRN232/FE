import type { User } from "@/types";
import type { ApiParent, ApiChild } from "./IParent";

const mapApiParentToUser = (
    apiParent: ApiParent
): User => ({
    id: apiParent.userId.toString(),
    name: apiParent.fullName || apiParent.userId.toString(),
    email: apiParent.email || "",
    phoneNumber: apiParent.phoneNumber || "",
    address: apiParent.address || "",
    avatar: undefined,
    createdAt: new Date(),
    role: "parent",
});

const mapApiChildToUser = (
    apiChild: ApiChild
): User => ({
    id: apiChild.id.toString(),
    name: apiChild.fullName,
    email: "",
    phoneNumber: "",
    avatar: undefined,
    createdAt: new Date(apiChild.dateOfBirth),
    role: "child",
});

export const getParentByUserId = async (
    userId: number
): Promise<{
    success: boolean;
    parent?: User;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Parent/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Get parent by user failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data.success && data.data) {
            const parent = mapApiParentToUser(data.data);
            return {
                success: true,
                parent,
            };
        }
        return {
            success: false,
            error: "No parent data returned"
        };
    } catch (error) {
        console.error("Get parent by user error:", error);
        return {
            success: false,
            error: "An error occurred while fetching parent data"
        };
    }
};

export const getChildrenByParentId = async (
    parentId: number
): Promise<{
    success: boolean;
    children?: User[];
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Parent/${parentId}/children`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}`}),
                },
            });

        if (!response.ok) {
            const text = await response.text();
            console.error("Get children by parent failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data.success && data.data) {
            const children = data.data.map((child: ApiChild) => mapApiChildToUser(child));
            return {
                success: true,
                children
            };
        }
        return {
            success: false,
            error: "No children data returned"
        };
    } catch (error) {
        console.error("Get children by parent error:", error);
        return {
            success: false,
            error: "An error occurred while fetching children data"
        };
    }
};

export const updateParent = async (
    parentId: number,
    data: { fullName?: string; phoneNumber?: string; address?: string }
): Promise<{
    success: boolean;
    parent?: User;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Parent/${parentId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify(data),
            });

        if (!response.ok) {
            const text = await response.text();
            console.error("Update parent failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const responseData = await response.json();
        if (responseData.success) {
            const updatedParentResult = await getParentByUserId(parentId);
            if (updatedParentResult.success && updatedParentResult.parent) {
                return {
                    success: true,
                    parent: updatedParentResult.parent
                };
            }
            return {
                success: true,
                parent: undefined
            };
        }
        return {
            success: false,
            error: "Update failed despite success flag"
        };
    } catch (error) {
        console.error("Update parent error:", error);
        return {
            success: false,
            error: "An error occurred while updating parent data"
        };
    }
};