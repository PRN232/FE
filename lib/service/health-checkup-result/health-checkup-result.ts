import {
    HealthCheckupResult,
    CreateHealthCheckupResultDto,
    UpdateHealthCheckupResultDto,
    ApiResponse
} from "./IHealth-checkup-result";
import { getAuthHeaders } from "@/lib/utils";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/results`;

export const getHealthCheckupResultsByCampaign = async (
    campaignId: number
): Promise<ApiResponse<HealthCheckupResult[]>> => {
    const response = await fetch(
        `${BASE_URL}/by-campaign/${campaignId}`,
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

export const getHealthCheckupResultById = async (
    resultId: number
): Promise<ApiResponse<HealthCheckupResult>> => {
    const response = await fetch(`${BASE_URL}/${resultId}`,
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

export const createHealthCheckupResult = async (
    resultData: CreateHealthCheckupResultDto
): Promise<HealthCheckupResult> => {
    const response = await fetch(`${BASE_URL}`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(resultData),
        }
    );

    const result: ApiResponse<HealthCheckupResult> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create health checkup result");
    }

    return result.data;
};

export const updateHealthCheckupResult = async (
    resultId: number,
    resultData: UpdateHealthCheckupResultDto
): Promise<HealthCheckupResult> => {
    const response = await fetch(`${BASE_URL}/${resultId}`,
        {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(resultData),
        }
    );

    const result: ApiResponse<HealthCheckupResult> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update health checkup result");
    }

    return result.data;
};

export const deleteHealthCheckupResult = async (
    resultId: number
): Promise<ApiResponse<boolean>> => {
    const response = await fetch(`${BASE_URL}/${resultId}`,
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