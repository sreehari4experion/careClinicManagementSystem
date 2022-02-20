import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Patient } from '../class/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patients:Patient[];
  formData: Patient = new Patient();
  constructor(private httpClient: HttpClient) { }

  //get all patients
  bindListPatients(){
    this.httpClient.get(environment.apiUrl + '/api/Patients/GetAllPatients').toPromise().then(
      response => {
        console.log("from  patient service");
        console.log(response);
        this.patients = response as Patient[];
      }
    )
  }

  //get Patient by id
  getPatient(id:number): Observable<any>{
    console.log(id);
    return this.httpClient.get(environment.apiUrl+ "/api/Patients/"+id);
  }

  //insert Patient
  insertPatient(patients:Patient): Observable<any>{
    console.log(" Patient id: " +patients.PatientId);
    console.log(" Patient name: " +patients.PatientName);
    console.log(" Phone: " +patients.Phone);
    return this.httpClient.post(environment.apiUrl+ "/api/Patients",patients);
  }

  //update Patient
  updatePatient(patients:Patient): Observable<any>{
    return this.httpClient.put(environment.apiUrl+ "/api/Patients",patients);
  }

  resetForm(form?: NgForm){
      this.formData = null;
      form.resetForm();
      console.log("reseting")
   
  }
}
