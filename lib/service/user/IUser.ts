export interface ApiUser {
    id?: number | string;
    username: string;
    email: string;
    createdAt?: string | Date;
    role: number;
    isActive?: boolean;
    phoneNumber?: string;
}