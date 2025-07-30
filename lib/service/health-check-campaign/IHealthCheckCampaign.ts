export enum VaccinationStatus {
    Planned, InProgress, Completed, Cancelled
}

export interface Vaccination {
    id: number;
    campaignName: string;
    checkupTypes: string;
    scheduledDate: string;
    targetGrades: string;
    status: VaccinationStatus;
    statusDisplay: VaccinationStatus;
    totalStudents: number;
    consentReceived: number;
    checkupsCompleted: number;
    requiringFollowup: number;
    completionRate: number;
    consentRate: number;
}

export interface CreateVaccinationDto {
    campaignName: string;
    checkupTypes: string;
    scheduledDate: string;
    targetGrades: string;
}

export interface UpdateVaccinationDto {
    id: number;
    campaignName: string;
    checkupTypes: string;
    scheduledDate: string;
    targetGrades: string;
    status: number;
}
