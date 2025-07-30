export interface ChronicDisease {
    id: number;
    medicalProfileId: number;
    diseaseName: string;
    medication: string;
    instructions: string;
}

export interface CreateChronicDiseaseDto {
    medicalProfileId: number;
    diseaseName: string;
    medication: string;
    instructions: string;
}

export interface UpdateChronicDiseaseDto {
    id: number;
    medicalProfileId: number;
    diseaseName: string;
    medication: string;
    instructions: string;
}