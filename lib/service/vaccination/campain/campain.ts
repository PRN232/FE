import {
    ApiResponse,
    ApiListResponse,
    VaccinationCampaign,
    StudentCampaign,
} from "./ICampain";
import { getAuthHeaders } from "@/lib/utils";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/vaccination-campaigns`;

export const getVaccinationCampaigns = async ():
    Promise<ApiListResponse<VaccinationCampaign>> =>
{
    const response = await fetch(`${BASE_URL}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    return response.json();
};

export const createVaccinationCampaign = async (
    campaign: {
        campaignName: string;
        vaccineType: string;
        scheduledDate: string;
        targetGrades: string;
    }
): Promise<ApiResponse<VaccinationCampaign>> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(campaign),
    });
    return response.json();
};

export const getVaccinationCampaignById = async (
    id: number
): Promise<ApiResponse<VaccinationCampaign>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    return response.json();
};

export const updateVaccinationCampaign = async (
    id: number,
    campaign: {
        campaignName: string;
        vaccineType: string;
        scheduledDate: string;
        targetGrades: string;
        status: string;
    }
): Promise<ApiResponse<VaccinationCampaign>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(campaign),
    });
    return response.json();
};

export const deleteVaccinationCampaign = async (
    id: number
): Promise<ApiResponse<VaccinationCampaign>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    return response.json();
};

export const getStudentsInCampaign = async (
    campaignId: number
): Promise<ApiListResponse<StudentCampaign>> => {
    const response = await fetch(`${BASE_URL}/${campaignId}/students`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    return response.json();
};
