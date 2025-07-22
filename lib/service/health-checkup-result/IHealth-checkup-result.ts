export interface HealthCheckupResult {
    id: number;
    studentId: number;
    studentName: string;
    studentCode: string;
    campaignId: number;
    campaignName: string;
    height: number;
    weight: number;
    bmi: number;
    bloodPressure: string;
    visionTest: string;
    hearingTest: string;
    generalHealth: string;
    requiresFollowup: boolean;
    recommendations: string;
    checkupDate: string;
    nurseId: number;
    nurseName: string | null;
}

export interface CreateHealthCheckupResultDto {
    studentId: number;
    studentName: string;
    height: number;
    weight: number;
    bloodPressure: string;
    visionTest: string;
    hearingTest: string;
    generalHealth: string;
    requiresFollowup: boolean;
    recommendations: string;
    checkupDate: string;
}

export interface UpdateHealthCheckupResultDto {
    id: number;
    height: number;
    weight: number;
    bloodPressure: string;
    visionTest: string;
    hearingTest: string;
    generalHealth: string;
    requiresFollowup: boolean;
    recommendations: string;
    checkupDate: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
    errors: string[];
}