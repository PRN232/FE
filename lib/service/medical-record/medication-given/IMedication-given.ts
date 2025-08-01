export interface CreateMedicationGivenDto {
    incidentId: number;
    medicationId: number;
    dosage: string;
    giveAt: string;
}

export interface UpdateMedicationGivenDto {
    incidentId: number;
    medicationId: number;
    dosage: string;
    giveAt: string;
}