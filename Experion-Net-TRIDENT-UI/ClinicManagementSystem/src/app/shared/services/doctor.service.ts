import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointments } from '../class/appointments';
import { Patient } from '../class/patient';
import { Notes } from '../class/notes';
import { Test } from '../class/test';
import { Medicine } from '../class/medicine';
import { Medicinedetails } from '../class/medicinedetails';
import { Testdetails } from '../class/testdetails';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  patients: Patient[];
  appointments: Appointments[];
  appointment: any[];
  note: Notes[];
  tests: Test[] = [];
  medicines: Medicine[];
  techs: any;
  pharms: any;
  apppatientId: number;
  patientNotes: Notes[] = [];
  appointmentId: number;
  patientId: number;

  formData: Notes = new Notes(); //add medicine

  formDataLab: Test = new Test();

  constructor(private httpClient: HttpClient, public router: Router) {}

  bindListAppointments(id: number) {
    this.httpClient
      .get(
        environment.apiUrl + '/api/Appointments/ViewAppointmentByDoctorId/' + id
      )
      .toPromise()
      .then((response) => {
        this.appointments = response as Appointments[];
        this.patientId = this.appointment[0][0].PatientId;
        console.log(response);
      });
  }
  //get appointments for today for doctor
  bindListAppointmentsForToday(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/Appointments/ViewAppointmentsToday/' + id)
      .toPromise()
      .then((response) => {
        this.appointments = response as Appointments[];
        console.log(response);
      });
  }

  //bind list of appointments for a particular for the doctor
  bindListAppointmentsForDate(id: number, date: Date) {
    this.httpClient
      .get(
        environment.apiUrl +
          '/api/Appointments/ViewAppointmentsondate/' +
          id +
          '/' +
          date
      )
      .toPromise()
      .then((response) => {
        this.appointments = response as Appointments[];
        console.log(response);
      });
  }

  bindListAppointmentsByID(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/Appointments/ViewAppointmentById/' + id)
      .toPromise()
      .then((response) => {
        this.appointment = response as any[];
        this.appointmentId = id;
        console.log('Appointment ID' + id);
        this.appointment = Array.of(this.appointment);
        this.apppatientId = this.appointment[0].PatientId;

        console.log(response);
      });
  }
  //--------- Binding Lab Technicians------------
  BindTechnicianList() {
    this.httpClient
      .get('https://localhost:44381/api/Role/Staff/5')
      .toPromise()
      .then((response) => {
        console.log('From Doctor Service \n Fetching Lab Technician Lists');
        console.log(response);
        this.techs = response;
      });
  }
  //--------- Binding Pharmacist------------
  BindPharmList() {
    this.httpClient
      .get('https://localhost:44381/api/Role/Staff/4')
      .toPromise()
      .then((response) => {
        console.log('From Doctor Service \n Fetching Pharmacist Lists');
        console.log(response);
        this.pharms = response;
      });
  }
  bindListPatientsNotes(id: number) {
    // patient notes binding
    this.httpClient
      .get(environment.apiUrl + '/api/DoctorsNotes/patient/' + id)
      .toPromise()
      .then((response) => {
        this.note = response as Notes[];
        console.log(response);
      });
  }

  bindlistPatientNotes(id: number) {
    console.log('binding notes');

    this.httpClient
      .get(environment.apiUrl + '/api/DoctorsNotes/patient/' + id)
      .toPromise()
      .then((response) => {
        this.patientNotes = response as Notes[];
        console.log(response);
      });
    // localhost:44381/api/DoctorsNotes/patient/1
  }

  // get the list of all lab tests
  bindListTests() {
    this.httpClient
      .get(environment.apiUrl + '/api/LabTests/GetAllTests')
      .toPromise()
      .then((response) => {
        this.tests = response as Test[];
        console.log(response);
      });
  }

  //get the list of all medicines
  bindListMedicines() {
    this.httpClient
      .get(environment.apiUrl + '/api/Medicines')

      .toPromise()
      .then((response) => {
        this.medicines = response as Medicine[];
        console.log(response);
      });
  }

  //add doctors notes
  //insert employee
  insertNotes(note: Notes): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/DoctorsNotes', note);
  }

  //update employee
  updateNotes(note: Notes): Observable<any> {
    return this.httpClient.put(environment.apiUrl + '/api/DoctorsNotes', note);
  }
  // Adding Medicine Advice
  insertMedicineAdvice(medadv: any): Observable<any> {
    return this.httpClient.post(
      'https://localhost:44381/api/MedicineAdvice',
      medadv
    );
  }

  // Adding Test Advice
  insertTestAdvice(testadv: any): Observable<any> {
    return this.httpClient.post(
      'https://localhost:44381/api/TestReport',
      testadv
    );
  }

  insertMedicineDetails(med: Medicinedetails): Observable<any> {
    return this.httpClient.post(
      ' https://localhost:44381/api/MedicineDetails',
      med
    );
  }
  insertTestDetails(test: Testdetails): Observable<any> {
    return this.httpClient.post(
      ' https://localhost:44381/api/TestAdvice',
      test
    );
  }
  //======================Patch=================================
  UpdateAppointment(id: number, form: any): Observable<any> {
    return this.httpClient.patch(
      'https://localhost:44381/api/Appointments/' + id,
      form
    );
  }

  //route to doctors page
  navDoc() {
    this.router.navigate(['doctor']);
  }

  //get appointmrnt details
  getAppointmentDetails(id: number): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + '/api/Appointments/ViewAppointmentById/' + id
    );
  }

  //delete notes
  bindDeleteNotes(id: number) {
    this.httpClient
      .delete(environment.apiUrl + '/api/DoctorsNotes/' + id)
      .toPromise()
      .then((response) => {
        console.log(response);
        console.log('note deleted');
      });
  }

  //get patient id with appointment id
  getPatientId(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/Appointments/GetPatient/' + id)
      .toPromise()
      .then((response) => {
        this.patientId = response[Object.keys(response)[0]] as number;

        console.log('patient id is ' + this.patientId);
      });
  }
  getPatient(id: number): Observable<any> {
    return this.httpClient.get(
      environment.apiUrl + '/api/Appointments/GetPatient/' + id
    );
  }
}
