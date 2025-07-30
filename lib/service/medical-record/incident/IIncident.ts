export interface CreateMedicalIncidentDto {
    studentId: number;
    nurseId: number;
    type: "Accident" | "Fever" | "Fall" | "Epidemic" | "Other";
    description: string;
    symptoms: string;
    treatment: string;
    severity: "Low" | "Medium" | "High";
    incidentDate: string;
    parentNotified?: boolean;
}

export interface UpdateMedicalIncidentDto {
    description?: string;
    symptoms?: string;
    treatment?: string;
    severity?: "Low" | "Medium" | "High";
    parentNotified?: boolean;
}