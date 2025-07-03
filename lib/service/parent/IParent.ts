export interface ApiParent {
    id: number;
    userId: number;
    fullName: string | null;
    phoneNumber: string | null;
    address: string | null;
    email: string | null;
    children?: ApiChild[];
}

export interface ApiChild {
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