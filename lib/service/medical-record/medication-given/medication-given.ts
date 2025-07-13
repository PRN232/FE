import { MedicationGiven } from "@/types";
import {
    CreateMedicationGivenDto,
    UpdateMedicationGivenDto,
    ApiResponse
} from "./IMedication-given";
import { getAuthHeaders } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";

const BASE_URL = `${NEXT_PUBLIC_API_URL}/medications-given`;

export const getAllMedicationsGiven = async ():
    Promise<ApiResponse<MedicationGiven[]>> =>
{
    const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const getMedicationGivenById = async (
    id: number
): Promise<ApiResponse<MedicationGiven>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const createMedicationGiven = async (
    medicationData: CreateMedicationGivenDto
): Promise<MedicationGiven> => {
    const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(medicationData),
        }
    );

    const result: ApiResponse<MedicationGiven> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create medication given");
    }

    return result.data;
};

export const updateMedicationGiven = async (
    id: number,
    medicationData: UpdateMedicationGivenDto
): Promise<MedicationGiven> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(medicationData),
        }
    );

    const result: ApiResponse<MedicationGiven> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update medication given");
    }

    return result.data;
};

export const deleteMedicationGiven = async (
    id: number
): Promise<ApiResponse<boolean>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};