
import { getAuthHeaders } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";
import { CreateVaccinationResultDto, UpdateVaccinationResultDto, VaccinationResult } from "./IVaccination-Result";

const BASE_URL = `${NEXT_PUBLIC_API_URL}/vaccination-records`;

export const getVaccinationRecordByCampaign = async (campaignId: number):
    Promise<ApiResponse<VaccinationResult[]>> => {
    const response = await fetch(`${BASE_URL}/by-campaign/${campaignId}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    return response.json();
};
export const createCampaignRecord = async (campaignData: CreateVaccinationResultDto): Promise<ApiResponse<VaccinationResult>> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(campaignData),
    });

    const result: ApiResponse<VaccinationResult> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create campaign");
    }

    return result;
}
export const updateCampaign = async (id:number,campaignData: UpdateVaccinationResultDto): Promise<ApiResponse<VaccinationResult>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(campaignData),
    });

    const result: ApiResponse<VaccinationResult> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to update campaign");
    }

    return result;
};
export const deleteCampaign = async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    if (response.status === 204) {
        // No content, but successful deletion
        return {
            success: true,
            data: true,
            message: "Campaign deleted successfully",
            errors: [],
        };
    }

    const result: ApiResponse<boolean> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return result;
};
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
}