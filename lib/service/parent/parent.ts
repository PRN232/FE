import type { User } from "@/types";
import type { ApiParent, ChildDTO } from "./IParent";

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

const mapApiChildToChildDTO = (
    child: ChildDTO
): ChildDTO => ({
    id: child.id,
    studentCode: child.studentCode,
    fullName: child.fullName,
    dateOfBirth: new Date(child.dateOfBirth),
    age: child.age,
    gender: child.gender,
    className: child.className,
    parentId: child.parentId,
    parentName: child.parentName,
    parentPhone: child.parentPhone,
    hasMedicalProfile: child.hasMedicalProfile,
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
    children?: ChildDTO[];
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
            const children = data.data.map((child: ChildDTO) => mapApiChildToChildDTO(child));
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