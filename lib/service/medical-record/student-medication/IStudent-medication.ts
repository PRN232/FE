export interface CreateStudentMedicationDto {
    studentId: number;
    medicationName: string;
    dosage: string;
    instructions: string;
    administrationTime: string;
    startDate: string;
    endDate: string;
}

export interface UpdateStudentMedicationDto {
    id: number;
    studentId: number;
    MedicationName: string;
    Dosage: string;
    Instructions: string;
    administrationTime: string;
    startDate: string;
    endDate: string;
    isApproved: "Pending" | "Approved" | "Rejected";
    isActive: boolean;
}

export interface StudentMedication {
    id: number;
    studentId: number;
    medicationName: string;
    dosage: string;
    instructions: string;
    administrationTime: string;
    administrationTimeDisplay: string;
    startDate: string;
    endDate: string;
    isApproved: "Pending" | "Approved" | "Rejected";
    isActive: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: Record<string, string[]> | string[];
}