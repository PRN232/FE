export interface User {
    id: string;
    name: string;
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