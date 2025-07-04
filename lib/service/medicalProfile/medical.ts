import {MedicalProfileResponse} from "@/lib/service/medicalProfile/IMedical";

export const getMedicalProfileByStudentId = async (
    studentId: number
): Promise<MedicalProfileResponse> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/MedicalProfile/by-student/${studentId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("Get medical profile failed:", text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`
            };
        }

        const data = await response.json();
        if (data.success && data.data) {
            return {
                success: true,
                profile: data.data
            };
        }
        return {
            success: false,
            error: "No medical profile data returned"
        };
    } catch (error) {
        console.error("Get medical profile error:", error);
        return {
            success: false,
            error: "An error occurred while fetching medical profile"
        };
    }
};