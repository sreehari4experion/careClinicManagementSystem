import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StaffService } from 'src/app/shared/services/staff.service';

@Component({
  selector: 'app-remove-staff',
  templateUrl: './remove-staff.component.html',
  styleUrls: ['./remove-staff.component.scss']
})
export class RemoveStaffComponent implements OnInit {

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

   //disable staff
  toDisableStaff(sID:number){
    console.log(" going to disable this staff = " +sID);
    if(sID != 0 && sID != null){
      console.log("staff id : "+ sID);
    }   
  }

     //enable staff
     toEnableStaff(sID:number){
      console.log(" going to enable this staff = " +sID);
      if(sID != 0 && sID != null){
        console.log("staff id : "+ sID);
      }   
    }

  
  //logout
  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
