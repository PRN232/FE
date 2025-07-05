export interface User {
    id: string;
    name: string;
    email: string;
    role: "student" | "child" | "parent" | "medical_staff" | "admin";
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
    healthRecord: HealthRecord
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

export interface MedicalRequest {
    id: string;
    studentName: string;
    class: string;
    requestType: "Medicine Administration" | "Emergency Contact" | "Vaccination Follow-up";
    medicine: string;
    dosage: string;
    duration: string;
    reason: string;
    status: "pending" | "approved" | "completed";
    requestDate: string;
    parentName: string;
    urgency: "low" | "medium" | "high";
}

export interface MedicalHistory {
    id: number;
    date: string;
    type: "Routine Checkup" | "Sick Visit" | "Vision Test" | "Other";
    diagnosis: string;
    doctor: string;
    notes: string;
}

export interface VaccinationHistory {
    id: number;
    vaccine: string;
    dose: string;
    date: string;
    nextDue: string;
    status: "scheduled" | "completed" | "missed";
}

export interface Allergy {
    id: number;
    allergen: string;
    severity: "high" | "medium" | "low";
    symptoms: string;
    dateReported: string;
}

export interface StudentHealthData {
    id: string;
    name: string;
    class: string;
    dateOfBirth: string;
    bloodType: string;
    height: string;
    weight: string;
    bmi: string;
    parentContact: string;
    emergencyContact: string;
    lastUpdated: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    specialization: string;
    experience: string;
    image: string;
    description: string;
}

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedAt: Date;
    category: string;
}