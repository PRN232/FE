import {
    MedicalIncident,
    CreateMedicalIncidentDto,
    UpdateMedicalIncidentDto,
    ApiResponse
} from "./IIncident";
import { getAuthHeaders } from "@/lib/utils";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/medical-incidents`;

export const getAllMedicalIncidents = async ():
    Promise<ApiResponse<MedicalIncident[]>> =>
{
    const response = await fetch(`${BASE_URL}`,
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

export const getMedicalIncidentById = async (
    incidentId: number
): Promise<ApiResponse<MedicalIncident>> => {
    const response = await fetch(
        `${BASE_URL}/${incidentId}`,
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

export const createMedicalIncident = async (
    incidentData: CreateMedicalIncidentDto
): Promise<MedicalIncident> => {
    const response = await fetch(`${BASE_URL}`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(incidentData),
        }
    );

    const result: ApiResponse<MedicalIncident> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create medical incident");
    }

    return result.data;
};

export const updateMedicalIncident = async (
    incidentId: number,
    incidentData: UpdateMedicalIncidentDto
): Promise<MedicalIncident> => {
    const response = await fetch(`${BASE_URL}/${incidentId}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(incidentData),
        }
    );

    const result: ApiResponse<MedicalIncident> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update medical incident");
    }

    return result.data;
};

export const deleteMedicalIncident = async (
    incidentId: number
): Promise<ApiResponse<boolean>> => {
    const response = await fetch(`${BASE_URL}/${incidentId}`,
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