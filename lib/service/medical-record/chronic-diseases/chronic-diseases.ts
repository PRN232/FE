import { getAuthHeaders } from "@/lib/utils";
import {
    ApiResponse,
    ChronicDisease,
    CreateChronicDiseaseDto,
    UpdateChronicDiseaseDto
} from "@/lib/service/medical-record/chronic-diseases/IChronic-diseases";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";

const BASE_URL = `${NEXT_PUBLIC_API_URL}/medicalprofiles`;

export const getAllChronicDiseases = async (
    medicalProfileId: number
): Promise<ChronicDisease[]> => {
    const response = await fetch(
        `${BASE_URL}/${medicalProfileId}/chronic-diseases`,
        {
            method: 'GET',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ChronicDisease[]> = await response.json();
    return result.data;
};

export const getChronicDiseaseById = async (
    medicalProfileId: number,
    diseaseId: number
): Promise<ChronicDisease> => {
    const response = await fetch(
        `${BASE_URL}/${medicalProfileId}/chronic-diseases/${diseaseId}`,
        {
            method: 'GET',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ChronicDisease> = await response.json();
    return result.data;
};

export const createChronicDisease = async (
    medicalProfileId: number,
    diseaseData: CreateChronicDiseaseDto
): Promise<ChronicDisease> => {
    const response = await fetch(
        `${BASE_URL}/${medicalProfileId}/chronic-diseases`,
        {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(diseaseData),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ChronicDisease> = await response.json();
    return result.data;
};

export const updateChronicDisease = async (
    medicalProfileId: number,
    diseaseData: UpdateChronicDiseaseDto
): Promise<ChronicDisease> => {
    const response = await fetch(
        `${BASE_URL}/${medicalProfileId}/chronic-diseases/${diseaseData.id}`,
        {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(diseaseData),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<ChronicDisease> = await response.json();
    return result.data;
};

export const deleteChronicDisease = async (
    medicalProfileId: number,
    diseaseId: number
): Promise<boolean> => {
    const response = await fetch(
        `${BASE_URL}/${medicalProfileId}/chronic-diseases/${diseaseId}`,
        {
            method: 'DELETE',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<boolean> = await response.json();
    return result.data;
};