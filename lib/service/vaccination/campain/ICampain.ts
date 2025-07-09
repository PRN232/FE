export interface VaccinationCampaign {
    id: number;
    campaignName: string;
    vaccineType: string;
    scheduledDate: string;
    targetGrades: string;
    status: string;
    statusDisplay: string;
    totalStudents: number;
    consentReceived: number;
    vaccinationsCompleted: number;
    completionRate: number;
    consentRate: number;
}

export interface StudentCampaign {
    id: number;
    studentCode: string;
    fullName: string;
    dateOfBirth: string;
    age: number;
    gender: string;
    className: string;
    parentId: number;
    parentName: string;
    parentPhone: string;
    hasMedicalProfile: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
    error?: string;
}

export interface ApiListResponse<T> {
    success: boolean;
    data?: T[];
    message?: string;
    errors?: string[];
    error?: string;
}
