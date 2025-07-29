
import { getAuthHeaders } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";
import { Medication } from "@/types";
import { ApiResponse, CreateMedicationDto } from "./IMedications";

const BASE_URL = `${NEXT_PUBLIC_API_URL}/medications`;

export const getAllMedications = async ():
    Promise<ApiResponse<Medication[]>> => {
    const response = await fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const getMedicationById = async (
    id: number
):
    Promise<ApiResponse<Medication>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const createMedication = async (
    medicationData: CreateMedicationDto
): Promise<ApiResponse<Medication>> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(medicationData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create medication given");
    }

    return result;
};

export const deleteMedication = async (
    id: number
): Promise<ApiResponse<boolean>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    if (response.status === 204) {
        return {
            success: true,
            data: true,
            message: "Medication deleted successfully",
            errors: [],
        };
    }

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return result;
};

export const updateMedication = async (
    id: number,
    medicationData: CreateMedicationDto
): Promise<ApiResponse<Medication>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(medicationData),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update medication");
    }

    return result;
}