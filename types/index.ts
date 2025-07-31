export interface User {
    id: string;
    name: string;
    parentId?: number;
    email: string;
    phoneNumber: string;
    address?: string;
    role: "student" | "child" | "parent" | "schoolnurse";
    avatar?: string;
    createdAt: Date;
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

export interface Vaccination {
    id: string
    vaccine: string
    date: Date
    batch: string
    administeredBy: string
    nextDue?: Date
    sideEffects?: string
}

export interface Medication {
    id: number;
    name: string;
    type: string;
    description: string;
    stockQuantity: number;
    expiryDate: string;
    storageInstructions: string;
    isExpired: boolean;
    isLowStock: boolean;
    daysToExpiry: number;
}

export interface MedicalConsent {
    id: number;
    consentType: "Vaccine" | "HealthCheckup";
    campaignId: number;
    campaignName: string;
    vaccineType?: string;

    studentId: number;
    studentName: string;
    studentCode?: string;
    className?: string;

    parentId: number;
    parentName: string;
    parentPhone?: string;

    consentGiven: boolean;
    consentDate: string;
    parentSignature: string;
    note: string;

    scheduledDate?: string;
    location?: string;
    targetGrades?: string;
    status?: "Pending" | "Approved" | "Rejected" | "Completed";

    participants?: number;
    totalStudents?: number;
    completionRate?: number
}

export interface MedicalConsentStatus {
    studentId: number;
    studentName: string;
    className: string;
    parentId: number;
    parentName: string;
    consentGiven: boolean;
    consentDate: string;
    consentType: string;
    campaignId: number;
}

export interface NotificationItem {
    id: string;
    title: string;
    description: string;
    targetGrades: string;
    date: string;
    time: string;
    location: string;
    status: "upcoming" | "ongoing" | "completed" | "pending" | "approved";
    participants: number;
    maxParticipants: number;
    priority: "high" | "medium" | "low";
    requirements: string[];
    consentType: "Vaccine" | "HealthCheckup";
    campaignId: number;
    parentSignature?: string;
    note?: string;
    consentGiven?: boolean;
    medicalConsentId: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
}