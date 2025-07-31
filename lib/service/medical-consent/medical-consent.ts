import { getAuthHeaders, handleApiResponse } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";
import {
    CreateMedicalConsentDto
} from "@/lib/service/medical-consent/IMedical-consent";
import {
    ApiResponse,
    MedicalConsent,
    MedicalConsentStatus
} from "@/types";

const BASE_URL = `${NEXT_PUBLIC_API_URL}/medical-consents`;

export const createMedicalConsentsForClass = async (
    consentData: CreateMedicalConsentDto
): Promise<ApiResponse<MedicalConsent[]>> => {
    const payload = {
        ConsentType: consentData.ConsentType,
        CampaignId: consentData.CampaignId
    };
    const response = await fetch(`${BASE_URL}/class`, {
        method: "POST",
        headers: { ...getAuthHeaders() },
        body: JSON.stringify(payload),
    });

    return handleApiResponse(response, "Failed to create medical consents for class");
};

export const getMedicalConsentStatusByCampaign = async (
    campaignId: number,
    consentType: string
): Promise<ApiResponse<MedicalConsentStatus[]>> => {
    const response = await fetch(
        `${BASE_URL}/campaign/${campaignId}/students/status?consentType=${encodeURIComponent(consentType)}`,
        {
            method: "GET",
            headers: { ...getAuthHeaders() },
        });

    return handleApiResponse(response, `Failed to fetch consent status for campaign ID ${campaignId}`);
};

export const getMedicalConsentsById = async (
    id: number
): Promise<ApiResponse<MedicalConsent[]>> => {
    const response = await fetch(`${BASE_URL}/student/${id}`, {
        method: "GET",
        headers: { ...getAuthHeaders() },
    });

    return handleApiResponse(response, `Failed to fetch medical consents for ID ${id}`);
};

export const updateMedicalConsent = async (
    data: {
        id: number;
        consentGiven: boolean;
        parentSignature: string;
        note: string;
    }
): Promise<ApiResponse<MedicalConsent>> => {
    try {
        const response = await fetch(`${BASE_URL}/${data.id}`, {
            method: "PUT",
            headers: { ...getAuthHeaders() },
            body: JSON.stringify({
                consentGiven: data.consentGiven,
                parentSignature: data.parentSignature,
                note: data.note
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("[API] Update failed with status:", response.status);
            return {
                success: false,
                data: {} as MedicalConsent,
                message: responseData.message || `Failed to update medical consent ID ${data.id}`,
                errors: responseData.errors || []
            };
        }

        return {
            success: true,
            data: responseData,
            message: responseData.message || "Update successful",
            errors: []
        };
    } catch (error) {
        console.error("[API] Update error:", error);
        return {
            success: false,
            data: {} as MedicalConsent,
            message: `Failed to update medical consent ID ${data.id}`,
            errors: [error instanceof Error ? error.message : "Unknown error"]
        };
    }
};