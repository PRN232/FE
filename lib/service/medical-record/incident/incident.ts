import { Incident } from "@/types";
import {
    CreateMedicalIncidentDto,
    UpdateMedicalIncidentDto,
    ApiResponse
} from "./IIncident";
import { getAuthHeaders } from "@/lib/utils";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/medical-incidents`;

const mapApiIncidentToIncident = (
    apiIncident: Incident
): Incident => ({
    ...apiIncident,
    nurseName: apiIncident.nurseName || ""
});

// Helper function to handle API responses
const handleApiResponse = async <T>(
    response: Response
): Promise<ApiResponse<T>> => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const getAllMedicalIncidents = async ():
    Promise<ApiResponse<Incident[]>> =>
{
    const response = await fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    const result = await handleApiResponse<Incident[]>(response);

    if (result.success) {
        result.data = result.data.map(mapApiIncidentToIncident);
    }

    return result;
};

export const getMedicalIncidentById = async (
    incidentId: number
): Promise<ApiResponse<Incident>> => {
    const response = await fetch(`${BASE_URL}/${incidentId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    const result = await handleApiResponse<Incident>(response);

    if (result.success) {
        result.data = mapApiIncidentToIncident(result.data);
    }

    return result;
};

export const createMedicalIncident = async (
    incidentData: CreateMedicalIncidentDto
): Promise<ApiResponse<Incident>> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(incidentData),
    });

    const result = await handleApiResponse<Incident>(response);

    if (result.success) {
        result.data = mapApiIncidentToIncident(result.data);
    }

    if (!response.ok) {
        throw new Error(result.message || "Failed to create medical incident");
    }

    return result;
};

export const updateMedicalIncident = async (
    incidentId: number,
    incidentData: UpdateMedicalIncidentDto
): Promise<ApiResponse<Incident>> => {
    const response = await fetch(`${BASE_URL}/${incidentId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(incidentData),
    });

    const result = await handleApiResponse<Incident>(response);

    if (result.success) {
        result.data = mapApiIncidentToIncident(result.data);
    }

    if (!response.ok) {
        throw new Error(result.message || "Failed to update medical incident");
    }

    return result;
};

export const deleteMedicalIncident = async (
    incidentId: number
): Promise<ApiResponse<boolean>> => {
    const response = await fetch(`${BASE_URL}/${incidentId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    return await handleApiResponse<boolean>(response);
};