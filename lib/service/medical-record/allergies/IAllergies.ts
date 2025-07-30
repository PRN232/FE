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