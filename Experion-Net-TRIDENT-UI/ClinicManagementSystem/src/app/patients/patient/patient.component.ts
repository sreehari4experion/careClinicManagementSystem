import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
dmin;dmax;
  loggedUser:string;
  pID:number;
  newAttribute: any = {};
  ID:number = 0;
  constructor(private authService: AuthService,public patientService: PatientService,private router: Router, 
    private toasterService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.loggedUser = localStorage.getItem("userName");
    
    this.dmin=new Date().toISOString().slice(0, 10);
  this.dmax=new Date("1890-01-01");
    //get bID from ActivateRoute
    this.pID = this.route.snapshot.params['pID'];

    //get book by id
    if(this.pID != 0 || this.pID != null){
      console.log(this.pID);

      //call method  get patient by id for updation
      this.patientService.getPatient(this.pID).subscribe(
        response =>{
          console.log(response);


          var datePipe = new DatePipe("en-UK");
          let formatedDate:any = datePipe.transform(response.DateOfBirth,'yyyy-MM-dd');
          response.DateOfBirth = formatedDate;
          this.patientService.formData = Object.assign({},response);
        },
        error =>{
          console.log(error);
        }
      )
    }
    // if(this.ID == 0){
    //   this.patientService.resetForm();
    // }
  }


  
  //Submit
  onSubmit(form:NgForm){
    console.log(form.value);

    let addId = this.patientService.formData.PatientId;
    // INSERT OR UPDATE
    if(addId == 0 || addId == null){
      //INSERT
      this.insertPatientRecord(form);
      this.toasterService.success('patient record has been inserted','CMSApp v2022');
      form.resetForm();
    }
    else{
      //UPDATE     
      this.updatePatientRecord(form);
     // this.patientService.resetForm();  
    }
  }

  //insert Method
  insertPatientRecord(form?: NgForm){
    console.log("Inserting a record...");
    this.patientService.insertPatient(form.value).subscribe(
      (result) => {
        this.toasterService.success('patient record has been inserted','CMSApp v2022');
        console.log(result);
        this.patientService.resetForm();
        
      },
      (error)=>{
        console.log(error);
      }
    );
  }


  //update Method
  updatePatientRecord(form?: NgForm){
    console.log("updating a record...");
    console.log(form.value);
    this.patientService.updatePatient(form.value).subscribe(
      (result) => {
        console.log(result);
        this.toasterService.success('patient record has been updated','CMSApp v2022');
        this.router.navigateByUrl("/patient-list/dashboard");
        //call reset form for clear the content
        this.patientService.resetForm();      
      },
      (error)=>{
        console.log(error);
      }
    );
  }


  

  //logout
  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
