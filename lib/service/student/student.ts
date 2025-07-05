import type {
    Student,
    User
} from "@/types";
import type {
    ApiStudent,
    CreateStudentRequest,
    UpdateStudentRequest
} from "./IStudent";

const mapApiStudentToUser = (apiStudent: ApiStudent): User => ({
    id: apiStudent.id.toString(),
    name: apiStudent.fullName,
    email: "",
    phoneNumber: "",
    avatar: undefined,
    createdAt: new Date(apiStudent.dateOfBirth),
    role: "student",
});

export const createStudent = async (
    studentData: CreateStudentRequest
): Promise<{
    success: boolean;
    student?: User;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Student`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify(studentData),
            });

        if (!response.ok) {
            const text = await response.text();
            console.error("Create student failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data.success && data.data) {
            const student = mapApiStudentToUser(data.data);
            return { success: true, student };
        }
        return {
            success: false,
            error: "No student data returned"
        };
    } catch (error) {
        console.error("Create student error:", error);
        return {
            success: false,
            error: "An error occurred while creating student"
        };
    }
};

export const updateStudent = async (
    studentId: number,
    studentData: UpdateStudentRequest
): Promise<{
    success: boolean;
    student?: User;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Student?id=${studentId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify(studentData),
            });

        if (!response.ok) {
            const text = await response.text();
            console.error("Update student failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data.success) {
            const updatedStudentResult = await getStudentById(studentId);
            if (updatedStudentResult.success && updatedStudentResult.student) {
                return { success: true, student: updatedStudentResult.student };
            }
            return {
                success: true,
                student: undefined
            };
        }
        return {
            success: false,
            error: "Update failed despite success flag"
        };
    } catch (error) {
        console.error("Update student error:", error);
        return {
            success: false,
            error: "An error occurred while updating student"
        };
    }
};

export const getStudentById = async (
    studentId: number
): Promise<{
    success: boolean;
    student?: User;
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Student/${studentId}`,
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
            console.error("Get student by ID failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data.success && data.data) {
            const student = mapApiStudentToUser(data.data);
            return { success: true, student };
        }
        return {
            success: false,
            error: "No student data returned"
        };
    } catch (error) {
        console.error("Get student by ID error:", error);
        return {
            success: false,
            error: "An error occurred while fetching student"
        };
    }
};

export const getStudentsByClass = async (
    className: string
): Promise<{
    success: boolean;
    students?: User[];
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Student/class/${className}`,
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
            console.error("Get students by class failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data.success && data.data) {
            const students = data.data.map((student: ApiStudent) => mapApiStudentToUser(student));
            return { success: true, students };
        }
        return {
            success: false,
            error: "No student data returned"
        };
    } catch (error) {
        console.error("Get students by class error:", error);
        return {
            success: false,
            error: "An error occurred while fetching students"
        };
    }
};

export const getStudentsByParentId = async (
    parentId: number
): Promise<{
    success: boolean;
    students?: Student[];
    error?: string;
}> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Student/parent/${parentId}`,
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
            console.error("Get students by parent failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data.success && data.data) {
            const students = data.data.map((student: ApiStudent) => mapApiStudentToUser(student));
            return {
                success: true,
                students
            };
        }
        return {
            success: false,
            error: "No student data returned"
        };
    } catch (error) {
        console.error("Get students by parent error:", error);
        return {
            success: false,
            error: "An error occurred while fetching students"
        };
    }
};