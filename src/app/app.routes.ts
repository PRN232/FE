import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HealthRecordFormComponent } from './components/health-record-form/health-record-form.component';
import { MedicineSubmissionComponent } from './components/medicine-submission/medicine-submission.component';
import { MedicalEventComponent } from './components/medical-event/medical-event.component';
import { MedicineInventoryComponent } from './components/medicine-inventory/medicine-inventory.component';
import { VaccinationProcessComponent } from './components/vaccination-process/vaccination-process.component';
import { MedicalExaminationComponent } from './components/medical-examination/medical-examination.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportComponent } from './components/report/report.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'health-record', component: HealthRecordFormComponent },
  { path: 'medicine-submission', component: MedicineSubmissionComponent },
  { path: 'medical-event', component: MedicalEventComponent },
  { path: 'medicine-inventory', component: MedicineInventoryComponent },
  { path: 'vaccination', component: VaccinationProcessComponent },
  { path: 'examination', component: MedicalExaminationComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'report', component: ReportComponent },
];
