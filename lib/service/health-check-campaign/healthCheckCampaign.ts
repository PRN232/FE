import { getAuthHeaders } from "@/lib/utils";
import { NEXT_PUBLIC_API_URL } from "@/lib/hook";
import { CreateVaccinationDto, UpdateVaccinationDto, Vaccination } from "./IHealthCheckCampaign";
import { ApiResponse } from "@/types";

const BASE_URL = `${NEXT_PUBLIC_API_URL}/campaigns`;

export const getAllCampaigns = async (): Promise<ApiResponse<Vaccination[]>> => {
    const response = await fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const getCampaignById = async (id: number): Promise<ApiResponse<Vaccination>> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};
export const createCampaign = async (campaignData: CreateVaccinationDto): Promise<ApiResponse<Vaccination>> => {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(campaignData),
    });

    const result: ApiResponse<Vaccination> = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to create campaign");
    }

    return result;
}
export const updateCampaign = async (campaignData: UpdateVaccinationDto): Promise<ApiResponse<Vaccination>> => {
    const response = await fetch(`${BASE_URL}/${campaignData.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(campaignData),
    });

    const result: ApiResponse<Vaccination> = await response.json();

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
// export const createMedication = async (
//     medicationData: CreateMedicationDto
// ): Promise<ApiResponse<Medication>> => {
//     const response = await fetch(`${BASE_URL}`, {
//         method: "POST",
//         headers: getAuthHeaders(),
//         body: JSON.stringify(medicationData),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//         throw new Error(result.message || "Failed to create medication given");
//     }

//     return result;
// };

// export const deleteMedication = async (
//     id: number
// ): Promise<ApiResponse<boolean>> => {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//         method: 'DELETE',
//         headers: getAuthHeaders(),
//     });

//     if (response.status === 204) {
//         // No content, but successful deletion
//         return {
//             success: true,
//             data: true,
//             message: "Medication deleted successfully",
//             errors: [],
//         };
//     }

//     const result = await response.json();

//     if (!response.ok) {
//         throw new Error(result.message || `HTTP error! status: ${response.status}`);
//     }

//     return result;
// };

// export const updateMedication = async (
//     id: number,
//     medicationData: CreateMedicationDto
// ): Promise<ApiResponse<Medication>> => {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//         method: "PUT",
//         headers: getAuthHeaders(),
//         body: JSON.stringify(medicationData),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//         throw new Error(result.message || "Failed to update medication");
//     }

//     return result;
// }