export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address?: string;
    role: "student" | "child" | "parent" | "schoolnurse" | "admin";
    avatar?: string;
    createdAt: Date;
}

export interface Student {
    id: string
    name: string
    dateOfBirth: Date
    grade: string
    class: string
    parentId: string
    avatar?: string
    healthRecord: HealthRecord | null
}

export interface ChildDTO {
    id: number;
    studentCode: string;
    fullName: string;
    dateOfBirth: Date;
    age: number;
    gender: string;
    className: string;
    parentId: number;
    parentName: string | null;
    parentPhone: string | null;
    hasMedicalProfile: boolean;
}

export interface HealthRecord {
    id: string
    studentId: string
    allergies: string[]
    chronicDiseases: string[]
    treatmentHistory: TreatmentHistory[]
    vision: VisionTest
    hearing: HearingTest
    vaccinations: Vaccination[]
    lastUpdated: Date
}

export interface Incident {
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
    severity: 'Low' | 'Medium' | 'High';
    parentNotified: boolean;
    incidentDate: string;
    medicationsGiven?: MedicationGiven[];
}

export interface MedicationGiven {
    id: number;
    incidentId: number;
    medicationId: number;
    giveAt: string;
    dosage: string;
}

export interface TreatmentHistory {
    id: string
    date: Date
    condition: string
    treatment: string
    doctor: string
    notes?: string
}

export interface VisionTest {
    leftEye: string
    rightEye: string
    testDate: Date
    notes?: string
}

export interface HearingTest {
    result: "normal" | "mild_loss" | "moderate_loss" | "severe_loss"
    testDate: Date
    notes?: string
}

export interface Vaccination {
    id: string
    vaccine: string
    date: Date
    batch: string
    administeredBy: string
    nextDue?: Date
    sideEffects?: string
}

export interface MedicineRequest {
    id: string
    studentId: string
    parentId: string
    medicineName: string
    dosage: string
    frequency: string
    duration: string
    instructions: string
    status: "pending" | "approved" | "rejected"
    requestDate: Date
    approvedBy?: string
    notes?: string
}

export interface MedicalIncident {
    id: string
    studentId: string
    type: "accident" | "fever" | "fall" | "epidemic" | "other"
    description: string
    severity: "low" | "medium" | "high" | "critical"
    treatmentGiven: string
    medicineUsed: string[]
    handledBy: string
    parentNotified: boolean
    date: Date
    followUpRequired: boolean
    status: "open" | "resolved"
}

export interface Medication {
    id: string;
    name: string;
    type: string;
    description: string;
    stockQuantity: number;
    expiryDate: Date;
    storageInstructions: string;
}

export interface VaccinationCampaign {
    id: string
    name: string
    vaccine: string
    targetGrades: string[]
    scheduledDate: Date
    consentDeadline: Date
    status: "planning" | "consent_collection" | "in_progress" | "completed"
    studentsEligible: number
    consentsReceived: number
    vaccinated: number
}

export interface MedicalExamination {
    id: string
    name: string
    type: "annual" | "vision" | "hearing" | "dental" | "general"
    targetGrades: string[]
    scheduledDate: Date
    notificationSent: boolean
    status: "scheduled" | "in_progress" | "completed"
    studentsScheduled: number
    studentsExamined: number
}