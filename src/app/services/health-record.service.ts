import { Injectable } from '@angular/core';
import { HealthRecord } from '../models/health-record';

@Injectable({
  providedIn: 'root',
})
export class HealthRecordService {
  private records: HealthRecord[] = [
    {
      studentId: 'S001',
      name: 'John Doe',
      allergies: ['Peanuts', 'Shellfish'],
      chronicDiseases: ['Asthma'],
      treatmentHistory: ['Inhaler prescribed 2024'],
      vision: '20/20',
      hearing: 'Normal',
      vaccinations: ['MMR', 'Polio'],
      lastUpdated: new Date('2025-01-10'),
    },
    {
      studentId: 'S002',
      name: 'Jane Smith',
      allergies: ['None'],
      chronicDiseases: ['None'],
      treatmentHistory: ['None'],
      vision: '20/30',
      hearing: 'Normal',
      vaccinations: ['MMR', 'Hepatitis B'],
      lastUpdated: new Date('2025-02-15'),
    },
  ];

  getRecords(): HealthRecord[] {
    return this.records;
  }

  addRecord(record: HealthRecord): void {
    this.records.push(record);
  }

  updateRecord(studentId: string, updatedRecord: HealthRecord): void {
    const index = this.records.findIndex((r) => r.studentId === studentId);
    if (index !== -1) {
      this.records[index] = updatedRecord;
    }
  }
}
