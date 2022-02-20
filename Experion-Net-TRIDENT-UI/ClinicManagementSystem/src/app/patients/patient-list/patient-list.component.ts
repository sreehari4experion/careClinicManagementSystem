import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  page: number = 1;
  filter: string;
  loggedUser: string;
  pID: number;
  constructor(
    private authService: AuthService,
    public patientService: PatientService,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem('userName');
    console.log('Welcome to patient-list');
    this.patientService.bindListPatients();
  }

  addPatient() {
    this.router.navigateByUrl('add-patient');
    this.resetForm();
  }

  //Edit patient
  updatePatient(pID:number){
    console.log(" going to update this " +pID);
    this.router.navigate(['update-patient',pID]);
  }

  resetForm(form?: NgForm){   
    form.resetForm();  
  }

  //logout
  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
