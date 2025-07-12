import { ChildDTO } from "@/types";

export interface ApiParent {
    id: number;
    userId: number;
    fullName: string | null;
    phoneNumber: string | null;
    address: string | null;
    email: string | null;
    children?: ChildDTO[];
}