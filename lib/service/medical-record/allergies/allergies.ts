import {
    Allergy,
    CreateAllergyDto,
    UpdateAllergyDto,
    ApiResponse
} from "@/lib/service/medical-record/allergies/IAllergies";
import { getAuthHeaders } from "@/lib/utils";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/medicalprofiles`;

export const getAllergies = async (
    medicalProfileId: number
): Promise<ApiResponse<Allergy[]>> => {
    const response = await fetch(
        `${API_BASE_URL}/${medicalProfileId}/allergies`,
        {
            method: 'GET',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const getAllergyById = async (
    medicalProfileId: number,
    allergyId: number
): Promise<ApiResponse<Allergy>> => {
    const response = await fetch(
        `${API_BASE_URL}/${medicalProfileId}/allergies/${allergyId}`,
        {
            method: 'GET',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const createAllergy = async (
    medicalProfileId: number,
    allergyData: CreateAllergyDto
): Promise<Allergy> => {
    const response = await fetch(
        `${API_BASE_URL}/${medicalProfileId}/allergies`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(allergyData),
        }
    );

    const result: ApiResponse<Allergy> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create allergy");
    }

    return result.data;
};

export const updateAllergy = async (
    medicalProfileId: number,
    allergyData: UpdateAllergyDto
): Promise<Allergy> => {
    const response = await fetch(
        `${API_BASE_URL}/${medicalProfileId}/allergies/${allergyData.id}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(allergyData),
        }
    );

    const result: ApiResponse<Allergy> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update allergy");
    }

    return result.data;
};

export const deleteAllergy = async (
    medicalProfileId: number,
    allergyId: number
): Promise<ApiResponse<boolean>> => {
    const response = await fetch(
        `${API_BASE_URL}/${medicalProfileId}/allergies/${allergyId}`,
        {
            method: 'DELETE',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};