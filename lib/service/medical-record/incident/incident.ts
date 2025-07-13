import { Incident } from "@/types";
import { getAuthHeaders } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";
import {
    ApiResponse,
    CreateMedicalIncidentDto,
    UpdateMedicalIncidentDto
} from "@/lib/service/medical-record/incident/IIncident";

const BASE_URL = `${NEXT_PUBLIC_API_URL}/medical-incidents`;

const mapApiIncidentToIncident = (
    apiIncident: Incident
): Incident => ({
    ...apiIncident,
    nurseName: apiIncident.nurseName || "",
});

const handleApiResponse = async <T>(
    response: Response
): Promise<ApiResponse<T>> => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const getAllMedicalIncidents = async ():
    Promise<ApiResponse<Incident[]>> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "GET",
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
        method: "GET",
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

    return result;
};

export const updateMedicalIncident = async (
    incidentId: number,
    incidentData: UpdateMedicalIncidentDto
): Promise<ApiResponse<Incident>> => {
    const response = await fetch(`${BASE_URL}/${incidentId}`, {
        method: "PUT",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(incidentData),
    });

    const result = await handleApiResponse<Incident>(response);

    if (result.success) {
        result.data = mapApiIncidentToIncident(result.data);
    }

    return result;
};

export const deleteMedicalIncident = async (incidentId: number): Promise<ApiResponse<boolean>> => {
    const response = await fetch(`${BASE_URL}/${incidentId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    return await handleApiResponse<boolean>(response);
};

