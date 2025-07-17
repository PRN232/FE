//  "id": 1,
//       "studentId": 1,
//       "studentCode": "STU001",
//       "studentName": "Nguyễn Minh Khang",
//       "campaignId": 1,
//       "campaignName": "Tiêm cúm mùa 2025",
//       "vaccineType": "Cúm A/B",
//       "vaccinationDate": "2025-07-12T00:00:00",
//       "batchNumber": "FLU2025-001",
//       "nurseId": 1,
//       "nurseName": "Đặng Thị Yến",
//       "sideEffects": "Đau cánh tay nhẹ",
//       "result": "Completed",
//       "resultDisplay": "Completed"

import { VaccinationStatus } from "../health-check-campaign/IHealthCheckCampaign";

export interface VaccinationResult {
    id: number;
    studentId: number;
    studentCode: string;
    studentName: string;
    campaignId: number;
    campaignName: string;
    vaccineType: string;
    vaccinationDate: string;
    batchNumber: string;
    nurseId: number;
    nurseName: string;
    sideEffects: string;
    result: VaccinationStatus; // "Planned", "InProgress", "Completed", "Cancelled
    resultDisplay: VaccinationStatus; // Display value for the result
}

export interface CreateVaccinationResultDto {
    studentId: number;
    campaignId: number;
    vaccineType: string;
    vaccinationDate: string;
    batchNumber: string;
    nurseId: number;
    sideEffects: string;
    result: VaccinationStatus; // "Planned", "InProgress", "Completed", "Cancelled"
}

export interface UpdateVaccinationResultDto {
    studentId: number;
    campaignId: number;
    vaccineType: string;
    vaccinationDate: string;
    batchNumber: string;
    nurseId: number;
    sideEffects: string;
    result: VaccinationStatus; // "Planned", "InProgress", "Completed", "Cancelled"
}