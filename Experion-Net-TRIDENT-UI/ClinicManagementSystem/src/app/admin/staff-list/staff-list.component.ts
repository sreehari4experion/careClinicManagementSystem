import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  page:number =1;
  filter:string;
  loggedUser:string;
  sID:number;
  constructor(private authService: AuthService,public staffService: StaffService,private router: Router, private toasterService: ToastrService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loggedUser = localStorage.getItem("userName");
    console.log("welcome to staff-list");
    this.staffService.bindListStaffs();
  }

  
 

  //Edit staff
  toUpdateStaff(sID:number){
    console.log(" going to update this staff = " +sID);
    //navigate to edit form with selected patient details
    this.router.navigate(['update-staff',sID]);
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
