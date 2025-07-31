export interface ApiUser {
    id?: number | string;
    userId: number;
    username: string;
    email: string;
    createdAt?: string | Date;
    role: number;
    isActive?: boolean;
    phoneNumber?: string;
}