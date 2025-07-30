export interface CreateMedicationDto {
    name: string;
    type: string;
    description: string;
    stockQuantity: number;
    expiryDate: string;
    storageInstructions: string;
}

export interface UpdateMedicationDto {
    name: string;
    type: string;
    description: string;
    stockQuantity: number;
    expiryDate: string;
    storageInstructions: string;
}