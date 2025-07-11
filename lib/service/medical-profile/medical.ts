import { ApiMedicalProfile } from "@/lib/service/medical-profile/IMedical";

export interface MedicalProfileResponse {
    success: boolean;
    profile?: ApiMedicalProfile;
    error?: string;
    message?: string;
    errors?: string[];
}

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/MedicalProfile/by-student`;

export const getMedicalProfileByStudentId = async (
    studentId: number
): Promise<MedicalProfileResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/${studentId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                },
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error(`Get medical profile failed for studentId ${studentId}:`, text);
            return {
                success: false,
                error: `HTTP Error: ${response.status} - ${text || "Unknown error"}`,
            };
        }

        const data = await response.json();

        if (data.success && (data.data || data.profile)) {
            return {
                success: true,
                profile: (data.data || data.profile) as ApiMedicalProfile,
                message: data.message,
                errors: data.errors || [],
            };
        }

        return {
            success: false,
            error: "No medical profile data returned",
            message: data.message,
            errors: data.errors || [],
        };
    } catch (error) {
        console.error(`Get medical profile error for studentId ${studentId}:`, error);
        return {
            success: false,
            error: "An error occurred while fetching medical profile",
        };
    }
};