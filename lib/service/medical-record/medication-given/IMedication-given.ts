export interface CreateMedicationGivenDto {
    incidentId: number;
    medicationId: number;
    dosage: string;
}

export interface UpdateMedicationGivenDto {
    incidentId: number;
    medicationId: number;
    dosage: string;
    giveAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
}