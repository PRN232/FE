import {
    getAuthHeaders,
    handleApiResponse
} from "@/lib/utils";
import {
    CreateStudentMedicationDto,
    StudentMedication,
    ApiResponse,
    UpdateStudentMedicationDto
} from "@/lib/service/medical-record/student-medication/IStudent-medication";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";

const BASE_URL = `${NEXT_PUBLIC_API_URL}/student-medications`;

export const getStudentMedicationsByParentId = async (
    parentId: number
): Promise<ApiResponse<StudentMedication[]>> => {
    const response = await fetch(`${BASE_URL}/parent/${parentId}`, {
        method: "GET",
        headers: { ...getAuthHeaders() },
    });

    return handleApiResponse(response, `Failed to fetch medications for parent ID ${parentId}`);
};

export const getAllStudentMedications = async ():
    Promise<ApiResponse<StudentMedication[]>> =>
{
    const response = await fetch(`${BASE_URL}`, {
        method: "GET",
        headers: { ...getAuthHeaders() },
    });

    return handleApiResponse(response, "Failed to fetch all student medications");
};

export const getStudentMedicationsByStudentId = async (
    studentId: number
): Promise<ApiResponse<StudentMedication[]>> => {
    const response = await fetch(`${BASE_URL}/student/${studentId}`, {
        method: "GET",
        headers: { ...getAuthHeaders() },
    });

    return handleApiResponse(response, `Failed to fetch medications for student ID ${studentId}`);
};

export const createStudentMedication = async (
    medicationData: CreateStudentMedicationDto
): Promise<ApiResponse<StudentMedication>> => {
    const payload = {
        studentId: medicationData.studentId,
        medicationName: medicationData.medicationName,
        dosage: medicationData.dosage,
        instructions: medicationData.instructions,
        administrationTime: medicationData.administrationTime,
        startDate: medicationData.startDate,
        endDate: medicationData.endDate
    };
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: { ...getAuthHeaders() },
        body: JSON.stringify(payload),
    });

    return handleApiResponse(response, "Failed to create student medication");
};

export const updateStudentMedicationApproval = async (
    medicationData: UpdateStudentMedicationDto
): Promise<ApiResponse<StudentMedication>> => {
    const response = await fetch(`${BASE_URL}/${medicationData.id}`, {
        method: "PUT",
        headers: { ...getAuthHeaders() },
        body: JSON.stringify(medicationData),
    });

    return handleApiResponse(response, `Failed to update approval status for medication ID ${medicationData.id}`);
};