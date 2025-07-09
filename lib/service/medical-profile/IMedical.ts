export interface ApiMedicalProfile {
    id: number;
    studentId: number;
    lastUpdated: string;
    allergies: {
        id: number;
        medicalProfileId: number;
        allergyName: string;
        severity: string;
        symptoms: string;
        treatment: string;
    }[];
    chronicDiseases: {
        id: number;
        medicalProfileId: number;
        diseaseName: string;
        medication: string;
        instructions: string;
    }[];
    medicalHistories: {
        id: number;
        medicalProfileId: number;
        condition: string;
        treatment: string;
        treatmentDate: string;
        doctor: string;
        notes: string;
    }[];
    vaccinationRecords: {
        id: number;
        medicalProfileId: number;
        vaccineName: string;
        vaccinationDate: string;
        doctor: string;
        notes: string;
    }[];
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