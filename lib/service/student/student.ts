import type { User, ChildDTO } from "@/types";
import type {
    ApiStudent,
    CreateStudentRequest,
    UpdateStudentRequest
} from "./IStudent";
import { getAuthHeaders } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";

const API_URL = `${NEXT_PUBLIC_API_URL}/Student`;

const mapApiStudentToUser = (apiStudent: ApiStudent): User => ({
    id: apiStudent.id.toString(),
    name: apiStudent.fullName,
    email: "",
    phoneNumber: "",
    avatar: undefined,
    createdAt: new Date(apiStudent.dateOfBirth),
    role: "student",
});

const mapApiStudentToChildDTO = (student: ApiStudent): ChildDTO => ({
    id: student.id,
    studentCode: student.studentCode,
    fullName: student.fullName,
    dateOfBirth: new Date(student.dateOfBirth),
    age: student.age,
    gender: student.gender,
    className: student.className,
    parentId: student.parentId,
    parentName: student.parentName,
    parentPhone: student.parentPhone,
    hasMedicalProfile: student.hasMedicalProfile,
});

const handleResponse = async <T, RawData = unknown>(
    response: Response,
    mapper?: (data: RawData) => T
): Promise<{ success: boolean; data?: T; error?: string }> => {
    const json = await response.json();
    if (!response.ok || !json.success) {
        console.error("API error:", json.message || json.error || "Unknown error");
        return { success: false, error: json.message || "Unknown error" };
    }

    const mapped = mapper ? mapper(json.data as RawData) : (json.data as T);
    return { success: true, data: mapped };
};

export const getAllStudents = async (): Promise<{
    success: boolean;
    students?: ChildDTO[];
    error?: string;
}> => {
    try {
        const res = await fetch(API_URL, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        const result = await handleResponse(res, (data: ApiStudent[]) =>
            data.map(mapApiStudentToChildDTO)
        );
        return {
            success: result.success,
            students: result.data,
            error: result.error,
        };
    } catch (err) {
        console.error("Fetch all students error:", err);
        return { success: false, error: "An error occurred while fetching all students" };
    }
};

export const createStudent = async (
    studentData: CreateStudentRequest
): Promise<{ success: boolean; student?: User; error?: string }> => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(studentData),
        });
        const result = await handleResponse(res, mapApiStudentToUser);
        return {
            success: result.success,
            student: result.data,
            error: result.error,
        };
    } catch (err) {
        console.error("Create student error:", err);
        return { success: false, error: "An error occurred while creating student" };
    }
};

export const updateStudent = async (
    id: number,
    studentData: UpdateStudentRequest
): Promise<{ success: boolean; student?: ChildDTO; error?: string }> => {
    try {
        const res = await fetch(`${API_URL}?id=${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(studentData),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
            return { success: false, error: json.message || "Update failed" };
        }

        return await getStudentById(id);
    } catch (err) {
        console.error("Update student error:", err);
        return { success: false, error: "An error occurred while updating student" };
    }
};

export const getStudentById = async (
    id: number
): Promise<{
    success: boolean;
    student?: ChildDTO;
    error?: string
}> => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });
        const result = await handleResponse(res, mapApiStudentToChildDTO);
        return {
            success: result.success,
            student: result.data,
            error: result.error,
        };
    } catch (err) {
        console.error("Get student error:", err);
        return { success: false, error: "An error occurred while fetching student" };
    }
};

export const getStudentsByClass = async (
    className: string
): Promise<{ success: boolean; students?: User[]; error?: string }> => {
    try {
        const res = await fetch(`${API_URL}/class/${className}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
            return { success: false, error: json.message || "Fetch failed" };
        }

        return {
            success: true,
            students: json.data.map((s: ApiStudent) => mapApiStudentToUser(s)),
        };
    } catch (err) {
        console.error("Fetch by class error:", err);
        return { success: false, error: "An error occurred while fetching students" };
    }
};

export const getStudentsByParentId = async (
    parentId: number
): Promise<{ success: boolean; students?: User[]; error?: string }> => {
    try {
        const res = await fetch(`${API_URL}/parent/${parentId}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        const json = await res.json();
        if (!res.ok || !json.success) {
            return { success: false, error: json.message || "Fetch failed" };
        }

        return {
            success: true,
            students: json.data.map((s: ApiStudent) => mapApiStudentToUser(s)),
        };
    } catch (err) {
        console.error("Fetch by parent error:", err);
        return { success: false, error: "An error occurred while fetching students" };
    }
};