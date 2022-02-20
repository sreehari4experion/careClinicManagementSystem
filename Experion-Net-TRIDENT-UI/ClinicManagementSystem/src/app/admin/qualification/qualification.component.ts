import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.scss']
})
export class QualificationComponent implements OnInit {

  loggedUser:string;
  constructor(private authService: AuthService,public staffService: StaffService,private router: Router, 
    private toasterService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("userName");
    this.staffService.bindListRoles();
  }


  
  
  //Submit
  onSubmit(form:NgForm){
    console.log(form.value);

    let addQualId = this.staffService.qualFormData.QualificationsId
    console.log(addQualId);
    // INSERT OR UPDATE
    if(addQualId == 0 || addQualId == null){
      //INSERT
      this.insertQualificationRecord(form);
      this.resetForm(form);    
    }
    else{
      //UPDATE     
      // this.updateStaffRecord(form);
      // this.resetForm(form);
    }
  }


  //insert Method
  insertQualificationRecord(form?: NgForm){
    console.log("Inserting a record...");
    this.staffService.insertQualification(form.value).subscribe(
      (result) => {
        console.log(result);
        this.toasterService.success('Qualification record has been inserted','CMSApp v2022');
        this.resetForm(form);
      },
      (error)=>{
        console.log(error);
      }
    );
  }


  
  resetForm(form?: NgForm){    
    form.resetForm(); 
}


  //logout
  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
