import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  loggedUser:string;
  sID:number;
  constructor(private authService: AuthService,public staffService: StaffService,private router: Router, 
    private toasterService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.loggedUser = localStorage.getItem("userName");

    this.staffService.bindListStaffs();
    this.staffService.bindListQualifications();
    this.staffService.bindListRoles();
    

    //get sID from ActivateRoute
    this.sID = this.route.snapshot.params['sID'];
    console.log(this.sID);
    //get staff by id
    if(this.sID != 0 || this.sID != null){
      console.log(this.sID);

      //call method  get staff by id for updation
      this.staffService.getStaff(this.sID).subscribe(
        response =>{
          console.log("response from get staff method");
          console.log(response);

          //let staffProperty = this.safetyCheck( ()=> response.staffFormData.StaffId);

          var datePipe = new DatePipe("en-UK");
          let formatedDate:any = datePipe.transform(response.DateOfBirth,'yyyy-MM-dd');
          response.DateOfBirth = formatedDate;
          // if(response.Staff == "true"){
          //   this.staffService.staffFormData.Status = "Active";
          // }
          // else{
          //   this.staffService.staffFormData.Status = "InActive";
          // }
          console.log("here is the status ="+this.staffService.staffFormData.Status);
          this.staffService.staffFormData = Object.assign({},response);
        },
        error =>{
          console.log(error);
        }
      )
    }
    

  }

  //Submit
  onSubmit(form:NgForm){
    console.log(form.value);

    let addStaffId = this.staffService.staffFormData.StaffId;
    console.log(addStaffId);
    // INSERT OR UPDATE
    if(addStaffId == 0 || addStaffId == null){
      //INSERT
      
      this.insertStaffRecord(form);
      this.resetForm(form);   
    }
    else{
      //UPDATE     
      this.updateStaffRecord(form);
      this.resetForm(form);
    }
  }

  
  //insert Method
  insertStaffRecord(form?: NgForm){
    console.log("Inserting a record...");
    console.log(form.value);
    console.log(this.staffService.staffFormData.Status);
    this.staffService.insertStaff(form.value).subscribe(
      (result) => {
        console.log(result);
        
        this.toasterService.success('staff record has been inserted','CMSApp v2022');
        this.resetForm(form);
      },
      (error)=>{
        console.log(error);
      }
    );
  }


  //update Method
  updateStaffRecord(form?: NgForm){
    console.log("updating a record...");
    this.staffService.updateStaff(form.value).subscribe(
      (result) => {
        console.log(result);

        this.toasterService.success('staff record has been updated','CMSApp v2022');
        this.resetForm(form);
        //this.router.navigateByUrl("/update-staff");
        //call reset form for clear the content
        //this.staffService.resetForm();      
      },
      (error)=>{
        console.log(error);
      }
    );
  }


  // resetForm(form?: NgForm){   
  //   form.resetForm();  
  // }

  resetForm(form?: NgForm){
    
    try{
          form.resetForm();
        }
        catch(e){
          return undefined;
        }
  }

  // safetyCheck(fn:any){
  //   try{
  //     return fn();
  //   }
  //   catch(e){
  //     return undefined;
  //   }
  // }

//logout
logOut(){
  this.authService.logout();
  this.router.navigateByUrl('login');
}
}
