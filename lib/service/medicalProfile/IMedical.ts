export interface ApiMedicalProfile {
    id: number;
    studentId: number;
    lastUpdated: string;
    allergies: string[];
    chronicDiseases: string[];
    medicalHistories: string[];
    vaccinationRecords: string[];
    height: number | null;
    weight: number | null;
    bloodPressure: string | null;
    visionTest: string | null;
    hearingTest: string | null;
    generalHealth: string | null;
    requiresFollowup: boolean | null;
    recommendations: string | null;
    lastCheckupDate: string | null;
}

export interface MedicalProfileResponse {
    success: boolean;
    profile?: ApiMedicalProfile;
    error?: string;
}