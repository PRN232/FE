export interface ApiStudent {
    id: number;
    studentCode: string;
    fullName: string;
    dateOfBirth: string;
    age: number;
    gender: string;
    className: string;
    parentId: number;
    parentName: string | null;
    parentPhone: string | null;
    hasMedicalProfile: boolean;
}

export interface CreateStudentRequest {
    studentCode: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    className: string;
    parentId: number;
}

export interface UpdateStudentRequest {
    fullName?: string;
    dateOfBirth?: string;
    gender?: string;
    className?: string;
    parentId?: number;
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