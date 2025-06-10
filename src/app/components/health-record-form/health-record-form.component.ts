import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { HealthRecordService } from '../../services/health-record.service';
import { HealthRecord } from '../../models/health-record';

@Component({
  selector: 'app-health-record-form',
  templateUrl: './health-record-form.component.html',
  styleUrls: ['./health-record-form.component.css'],
  imports: [
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    ReactiveFormsModule,
  ],
})
export class HealthRecordFormComponent {
  healthForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private healthRecordService: HealthRecordService
  ) {
    this.healthForm = this.fb.group({
      name: ['', Validators.required],
      allergies: [''],
      chronicDiseases: [''],
      vision: [''],
      hearing: [''],
      vaccinations: [''],
    });
  }

  submitForm(): void {
    if (this.healthForm.valid) {
      const record: HealthRecord = {
        studentId: `S${Math.floor(Math.random() * 1000)}`,
        name: this.healthForm.value.name,
        allergies: this.healthForm.value.allergies
          .split(',')
          .map((a: string) => a.trim()),
        chronicDiseases: this.healthForm.value.chronicDiseases
          .split(',')
          .map((c: string) => c.trim()),
        treatmentHistory: [],
        vision: this.healthForm.value.vision,
        hearing: this.healthForm.value.hearing,
        vaccinations: this.healthForm.value.vaccinations
          .split(',')
          .map((v: string) => v.trim()),
        lastUpdated: new Date(),
      };
      this.healthRecordService.addRecord(record);
      this.healthForm.reset();
    }
  }
}
