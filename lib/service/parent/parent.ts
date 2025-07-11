import type { User, ChildDTO } from "@/types";
import type { ApiParent } from "./IParent";
import { getAuthHeaders } from "@/lib/utils";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Parent`;

const mapApiParentToUser = (apiParent: ApiParent): User => ({
    id: apiParent.userId.toString(),
    name: apiParent.fullName || apiParent.userId.toString(),
    email: apiParent.email || "",
    phoneNumber: apiParent.phoneNumber || "",
    address: apiParent.address || "",
    avatar: undefined,
    createdAt: new Date(),
    role: "parent",
});

const mapApiChildToChildDTO = (child: ChildDTO): ChildDTO => ({
    ...child,
    dateOfBirth: new Date(child.dateOfBirth),
});

export const getParentByUserId = async (
    userId: number
): Promise<{ success: boolean; parent?: User; error?: string }> => {
    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
            const message = data.message || "Get parent failed";
            console.error(message);
            return { success: false, error: message };
        }

        return { success: true, parent: mapApiParentToUser(data.data) };
    } catch (error) {
        console.error("Get parent error:", error);
        return { success: false, error: String(error) };
    }
};

export const getChildrenByParentId = async (
    parentId: number
): Promise<{ success: boolean; children?: ChildDTO[]; error?: string }> => {
    try {
        const response = await fetch(`${API_URL}/${parentId}/children`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
            const message = data.message || "Get children failed";
            console.error(message);
            return { success: false, error: message };
        }

        const children = data.data.map((child: ChildDTO) => mapApiChildToChildDTO(child));
        return { success: true, children };
    } catch (error) {
        console.error("Get children error:", error);
        return { success: false, error: String(error) };
    }
};

export const updateParent = async (
    parentId: number,
    update: { fullName?: string; phoneNumber?: string; address?: string }
): Promise<{ success: boolean; parent?: User; error?: string }> => {
    try {
        const response = await fetch(`${API_URL}/${parentId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(update),
        });

        const data = await response.json();
        if (!response.ok || !data.success) {
            const message = data.message || "Update parent failed";
            console.error(message);
            return { success: false, error: message };
        }

        const parentResult = await getParentByUserId(parentId);
        return { success: true, parent: parentResult.parent };
    } catch (error) {
        console.error("Update parent error:", error);
        return { success: false, error: String(error) };
    }
};
