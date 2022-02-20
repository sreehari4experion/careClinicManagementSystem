import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { StaffService } from '../shared/services/staff.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  username = sessionStorage.getItem('userName');
  constructor(private router: Router, private authService: AuthService ,public staffService: StaffService) { }

  ngOnInit(): void {

  }
  toAddStaff(){
    this.router.navigateByUrl('add-staff');
    this.staffService.resetForm();   
  }


 logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
