import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Qualification } from '../class/qualification';
import { Role } from '../class/role';
import { Staff } from '../class/staff';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  staffs: Staff[];
  staffFormData: Staff = new Staff();
  qualify: any[];
  qualFormData: Qualification = new Qualification();
  roles: any[];

  constructor(private httpClient: HttpClient) {}

  //get all staffs
  bindListStaffs() {
    this.httpClient
      .get(environment.apiUrl + '/api/Staff')
      .toPromise()
      .then((response) => {
        console.log('from  staff service');
        console.log(response);
        this.staffs = response as Staff[];
      });
  }

  //get  qualifications
  bindListQualifications() {
    this.httpClient
      .get(environment.apiUrl + '/api/Qualifications')
      .toPromise()
      .then((response) => {
        console.log('from qualification  service');

        this.qualify = response as any[];
        console.log(this.qualify);
      });
  }

  //get  roles
  bindListRoles() {
    this.httpClient
      .get(environment.apiUrl + '/api/Role')
      .toPromise()
      .then((response) => {
        console.log('from role  service');
        console.log(response);
        this.roles = response as any[];
       
      });
  }
  //get staff by id
  getStaff(id: number): Observable<any> {
    console.log(id);
    return this.httpClient.get(environment.apiUrl + '/api/Staff/' + id);
  }

  //insert staff
  insertStaff(staffs: Staff): Observable<any> {
    

    let temp = staffs.Status;
    if(temp){      
      staffs.Status = "Active";
    }else{
      staffs.Status = "InActive";
    }
    console.log(' status: ' + staffs.Status);
    
    return this.httpClient.post(environment.apiUrl + '/api/Staff', staffs);
  }

  //update staff
  updateStaff(staffs: Staff): Observable<any> {
    
    let temp = staffs.Status;
    if(temp){      
      staffs.Status = "Active";
    }else{
      staffs.Status = "InActive";
    }
    return this.httpClient.put(environment.apiUrl + '/api/Staff', staffs);
  }

  insertQualification(qualify: Qualification): Observable<any> {
 
    return this.httpClient.post(
      environment.apiUrl + '/api/Qualifications',
      qualify
    );
  }

  resetForm(form?: NgForm) {
    this.staffFormData = null;
    console.log('reseting');
    form.resetForm();
    console.log('reset done');
  }
}
