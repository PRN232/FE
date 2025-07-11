export interface MedicationGiven {
    id: number;
    incidentId: number;
    medicationId: number;
    giveAt: string;
    dosage: string;
}

export interface MedicalIncident {
    id: number;
    studentId: number;
    studentName: string;
    studentCode: string;
    nurseId: number;
    nurseName: string | null;
    type: string;
    description: string;
    symptoms: string;
    treatment: string;
    severity: 'low' | 'medium' | 'high';
    parentNotified: boolean;
    incidentDate: string;
    medicationsGiven: MedicationGiven[];
}

export interface CreateMedicalIncidentDto {
    studentId: number;
    nurseId: number;
    type: string;
    description: string;
    symptoms: string;
    treatment: string;
    severity: 'low' | 'medium' | 'high';
    incidentDate: string;
    parentNotified?: boolean;
}

export interface UpdateMedicalIncidentDto {
    description?: string;
    symptoms?: string;
    treatment?: string;
    severity: 'low' | 'medium' | 'high';
    parentNotified?: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
}