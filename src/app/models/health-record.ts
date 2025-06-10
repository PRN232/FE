export interface HealthRecord {
  studentId: string;
  name: string;
  allergies: string[];
  chronicDiseases: string[];
  treatmentHistory: string[];
  vision: string;
  hearing: string;
  vaccinations: string[];
  lastUpdated: Date;
}
