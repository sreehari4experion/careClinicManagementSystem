import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LabtTest } from '../class/labt-test';
import { TestAdvice } from '../class/test-advice';
import {Testreport} from '../class/testreport';
import {Testrep} from '../class/testrep';

@Injectable({
  providedIn: 'root'
})
export class LabtTestService {

  tests:LabtTest[];
  testview:Testrep[];
  testreps:any;
  formDataOne: LabtTest = new LabtTest();
  testreports:Testreport[];
  testadvices:TestAdvice[];
  appointId:number;
  constructor(private httpClient: HttpClient) { }

  //get all tests
  bindListTests(){
    this.httpClient.get(environment.apiUrl + '/api/LabTests/GetAllTests').toPromise().then(
      response => {
        console.log("from lab test service");
        console.log(response);
        this.tests = response as LabtTest[];
      }
    )
  }

  bindListReports(){
    this.httpClient.get('https://localhost:44381/api/TestReport').toPromise().then(
      response => {
        console.log("From Lab test service fetching Test Reports");
        console.log(response);
        this.testview = response as Testrep[];
      }
    )
  }

  bindListReportsById(id:number){
    this.httpClient.get('https://localhost:44381/api/TestReport/'+id).toPromise().then(
      response => {
        console.log("From Lab test service fetching Test Report");
        console.log(response);
        this.testreps = response;
        this.testreps=Array.of(this.testreps);
        this.appointId=this.testreps[0].AppointmentId;
      }
    )
  }
  //get Test by id
  getTest(id:number): Observable<any>{
    console.log(" for this id we are going to search"+id);
    return this.httpClient.get(environment.apiUrl+ "/api/LabTests/"+id);
  }

  //insert Test
  insertTest(tests:LabtTest): Observable<any>{
    console.log(" test id: " +tests.TestId);
    console.log(" test name: " +tests.TestName);
    console.log(" Price: " +tests.TotalAmount);
    return this.httpClient.post(environment.apiUrl+ "/api/LabTests",tests);
  }

  //update test
  updateTest(tests:LabtTest): Observable<any>{
    return this.httpClient.put(environment.apiUrl+ "/api/LabTests",tests);
  }


  //get  test advices
  bindListTestAdvices(){
    this.httpClient.get(environment.apiUrl + '/api/TestAdvice/GetTestDetails').toPromise().then(
      response => {
        console.log("from lab test advice service");
        console.log(response);
        this.testadvices = response as TestAdvice[];
      }
    )
  }
 bindListTestReports(){
    this.httpClient.get('https://localhost:44381/api/LabBill').toPromise().then(response=>{
      console.log("From Service");
      console.log(response);
      this.testreports=response as Testreport[];
     // this.testreports=Array.of(this.testreports);
      console.log(this.testreports);
    })
  }
  //--------------POST-------------------
  insertLabBill(labbill:any): Observable<any>{
    return this.httpClient.post('https://localhost:44381/api/LabBill',labbill);
  }
  //----------------PATCH------------------
  updateLabReportTests(id:number,patch:any):Observable<any>
  {
    return this.httpClient.patch('https://localhost:44381/api/TestAdvice/'+id,patch);
  }
  updateLabReport(id:number,patch:any):Observable<any>
  {
    return this.httpClient.patch('https://localhost:44381/api/TestReport/'+id,patch);
  }

//=========================================================
  resetForm(form?: NgForm){
      this.formDataOne = null;
      form.resetForm();
      console.log("reseting")
   
  }

}
