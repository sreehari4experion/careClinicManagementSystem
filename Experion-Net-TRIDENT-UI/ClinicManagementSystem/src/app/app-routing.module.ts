import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ViewappointmentComponent } from './doctor/viewappointment/viewappointment.component';
import { LabTechnicianComponent } from './lab-technician/lab-technician.component';
import { TestAdviceListComponent } from './lab-technician/test-advice-list/test-advice-list.component';
import { TestComponent } from './lab-technician/test/test.component';
import { LoginComponent } from './login/login.component';
import { AddmedicineComponent } from './pharmacist/addmedicine/addmedicine.component';
import { MedicinesComponent } from './pharmacist/medicines/medicines.component';
import { PharmacistComponent } from './pharmacist/pharmacist.component';
import { PrescriptionComponent } from './pharmacist/prescription/prescription.component';

import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { PatientComponent } from './patients/patient/patient.component';

import { AddappointmentComponent } from './receptionist/addappointment/addappointment.component';
import { AddconsultationComponent } from './receptionist/addconsultation/addconsultation.component';
import { AddinvoiceComponent } from './receptionist/addinvoice/addinvoice.component';
import { DashboardComponent } from './receptionist/dashboard/dashboard.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
//import {ViewappointmentComponent} from './doctor/viewappointment/viewappointment.component'
import { ViewappointmentsComponent } from './receptionist/viewappointments/viewappointments.component';
import { ViewconsultationComponent } from './receptionist/viewconsultation/viewconsultation.component';
import { ViewinvoiceComponent } from './receptionist/viewinvoice/viewinvoice.component';

import { AuthGuard } from './shared/auth.guard';
import { ViewreportComponent } from './lab-technician/viewreport/viewreport.component';
import { ViewmedicinebillComponent } from './pharmacist/viewmedicinebill/viewmedicinebill.component';
import { EditmedicineComponent } from './pharmacist/editmedicine/editmedicine.component';
import { ViewTestComponent } from './lab-technician/view-test/view-test.component';
import { StaffListComponent } from './admin/staff-list/staff-list.component';
import { StaffComponent } from './admin/staff/staff.component';
import { QualificationComponent } from './admin/qualification/qualification.component';
import { RemoveStaffComponent } from './admin/remove-staff/remove-staff.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'doctor',
    component: DoctorComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '1' },
  },
  {
    path: 'viewappointments',
    component: ViewappointmentComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '1' },
  },
  {
    path: 'viewappointments/:id',
    component: ViewappointmentComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '1' },
  },
//==========Lab Technician=======================
  {
    path: 'lab-technician',
    component: LabTechnicianComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '4' },
  },
  {
    path: 'viewreport',
    component: ViewreportComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '4' },
  },
  { path: 'add-test', component: TestComponent, canActivate: [AuthGuard],
  data: { RoleId: '4' } },
  { path: 'update-test/:tID', component: TestComponent , canActivate: [AuthGuard],
  data: { RoleId: '4' }},
  { path: 'update-testreport/:tID', component:TestAdviceListComponent, canActivate: [AuthGuard],
  data: { RoleId: '4' } },
  {
    path: 'viewtest',
    component:ViewTestComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '4' },
  },


  { path: 'test-advice-list', component: TestAdviceListComponent, canActivate: [AuthGuard],
  data: { RoleId: '4' } },

  //===================patient=============================
  { path: 'patient-list', component: PatientListComponent },
  { path: 'patient-list/dashboard', component: PatientListComponent },
  { path: 'add-patient', component: PatientComponent },
  { path: 'update-patient/:pID', component: PatientComponent },
  //===================Receptionist=============================
  {
    path: 'receptionist',
    component: ReceptionistComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '3' },
  },
  { path: 'patient-list', component: PatientListComponent },
  { path: 'patient-list/dashboard', component: PatientListComponent },
  { path: 'add-patient', component: PatientComponent },
  { path: 'update-patient/:pID', component: PatientComponent },
  {
    path: 'receptionist/viewappointment',
    component: ViewappointmentsComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '3' },
  },
  {
    path: 'receptionist/addappointment',
    component: AddappointmentComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '3' },
  },
  {
    path: 'receptionist/addconsultation',
    component: AddconsultationComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '3' },
  },
  {
    path: 'receptionist/addinvoice',
    component: AddinvoiceComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '3' },
  },
  {
    path: 'receptionist/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '3' },
  },
  {
    path: 'receptionist/viewconsultation',
    component: ViewconsultationComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '3' },
  },
  {
    path: 'receptionist/viewinvoice',
    component: ViewinvoiceComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '3' },
  },
  //================================Admin=================================
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '2' },
  },
  { path: 'staff-list', component:StaffListComponent, canActivate: [AuthGuard],
  data: { RoleId: '2' }},
  { path: 'add-staff', component:StaffComponent, canActivate: [AuthGuard],
  data: { RoleId: '2' }},
  { path: 'update-staff/:sID', component:StaffComponent, canActivate: [AuthGuard],
  data: { RoleId: '2' }},
  { path: 'add-qualification', component:QualificationComponent, canActivate: [AuthGuard],
  data: { RoleId: '2' }},
  { path: 'remove-staff', component:RemoveStaffComponent, canActivate: [AuthGuard],
  data: { RoleId: '2' }},
  //=============================Pharmacist================================
  {
    path: 'pharmacist',
    component: PharmacistComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '5' },
  },
  {
    path: 'medicinesbill',
    component: ViewmedicinebillComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '5' },
  },
  {
    path: 'prescription/:id',
    component: PrescriptionComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '5' },
  },
  {
    path: 'prescription',
    component: PrescriptionComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '5' },
  },
  {
    path: 'medicines',
    component: MedicinesComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '5' },
  },
  {
    path: 'addmedicines',
    component: AddmedicineComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '5' },
  },
  {
    path: 'addmedicines/:id',
    component: AddmedicineComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '5' },
  },
  {
    path: 'editmedicines/:id',
    component: EditmedicineComponent,
    canActivate: [AuthGuard],
    data: { RoleId: '5' },
  },
  // { path: 'employees/:userId', component: EmployeesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
