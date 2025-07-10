export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
}

export interface Allergy {
    id: number;
    medicalProfileId: number;
    allergyName: string;
    severity: string;
    symptoms: string;
    treatment: string;
}

export interface CreateAllergyDto {
    medicalProfileId: number;
    allergyName: string;
    severity: string;
    symptoms: string;
    treatment: string;
}

export interface UpdateAllergyDto {
    id: number;
    medicalProfileId: number;
    allergyName: string;
    severity: string;
    symptoms: string;
    treatment: string;
}