import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Advice } from '../class/advice';
import { Medicine } from '../class/medicine';
import { Medicinebill } from '../class/medicinebill';

@Injectable({
  providedIn: 'root',
})
export class PharmacistService {
  //declare variables
  advice: Advice[];
  medAdvice: any[];
  med: Medicine[];
  medicinebills: Medicinebill[];
  stock: any[];
  medadid:number;

  // form controls
  //retrieve all data from getAll employees -- http -- HttpClient
  medicines: Medicine[]; // all employee data
  medicinesData: Medicine[];
  formData: Medicine = new Medicine(); // stores one employee details

  constructor(private httpClient: HttpClient) {}

  bindListMedicineAdvices() {
    this.httpClient
      .get(environment.apiUrl + '/api/MedicineAdvice')
      .toPromise()
      .then((response) => {
        this.advice = response as Advice[];
        console.log(response);
      });
  }
  bindListMedicineAdvicesById(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/MedicineAdvice/id/' + id)
      .toPromise()
      .then((response) => {
        this.medAdvice = response as any[];
        this.medAdvice = Array.of(this.medAdvice);
        this.medadid=this.medAdvice[0].MedicineAdviceId;
        console.log(response);
      });
  }
  bindMedicineBill() {
    this.httpClient
      .get(environment.apiUrl + '/api/MedicineBill/ViewMedicineBills')
      .toPromise()
      .then((response) => {
        console.log('From  Pharmacist Service: Got MedicineBills');
        console.log(response);
        this.medicinebills = response as Medicinebill[];
      });
  }
  bindListMedicines() {
    this.httpClient
      .get(environment.apiUrl + '/api/Medicines')
      .toPromise()
      .then((response) => {
        this.med = response as Medicine[];
        console.log(response);
      });
  }

  //crud for medicines
  //insert medicines
  insertMedicine(medicines: Medicine): Observable<any> {
    return this.httpClient.post(
      environment.apiUrl + '/api/Medicines',
      medicines
    );
  }

  //update medicines
  updateMedicine(medicines: Medicine): Observable<any> {
    return this.httpClient.put(
      environment.apiUrl + '/api/Medicines',
      medicines
    );
  }

  //delete medicines
  deleteMedicine(id: number) {
    this.httpClient
      .delete(environment.apiUrl + '/api/Medicines/' + id)
      .toPromise()
      .then((response) => {
        console.log(response);
      });
  }

  //bind list medicines by id
  bindListMedicinesById(id: number) {
    this.httpClient
      .get(environment.apiUrl + '/api/Medicines/' + id)
      .toPromise()
      .then((response) => {
        this.medicinesData = response as Medicine[];
        console.log(response);
      });
  }

  // get medicines by id
  getMedicineById(id: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/api/Medicines/' + id);
  }

  //bind list medicine stock
  bindListStock(id) {
    this.httpClient
      .get(environment.apiUrl + '/api/Medicines/stock?id=' + id)
      .toPromise()
      .then((response) => {
        this.stock = response as any[];
        this.stock = Array.of(this.stock);
        console.log(response);
      });
  }

  //Get a Stock

  fetchStock(id:number):Observable<any>
  {
    return this.httpClient.get(environment.apiUrl + '/api/Medicines/stock?id=' + id);
  }
  //Adding Medicine Bill
  insertMedicineBill(med:any): Observable<any> {
    return this.httpClient.post( 'https://localhost:44381/api/MedicineBill',med );
  }


  //Patch
updateMedAdvice(id:number,mpat:any):Observable<any>
{
  return this.httpClient.patch('https://localhost:44381/api/MedicineAdvice/'+id,mpat);
}

updateMedStock(medname:string,pathca:any)
{
  return this.httpClient.patch('https://localhost:44381/api/Medicines/'+medname,pathca);
}
  //==============
}
