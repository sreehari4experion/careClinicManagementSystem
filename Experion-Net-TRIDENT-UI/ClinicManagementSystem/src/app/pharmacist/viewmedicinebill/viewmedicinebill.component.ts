import { Component, OnInit } from '@angular/core';
import { PharmacistService } from 'src/app/shared/services/pharmacist.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-viewmedicinebill',
  templateUrl: './viewmedicinebill.component.html',
  styleUrls: ['./viewmedicinebill.component.scss'],
})
export class ViewmedicinebillComponent implements OnInit {
  //declare variables
  username = sessionStorage.getItem('userName');
  staffId = sessionStorage.getItem('staffId');

  page: number = 1;
  filter: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    public medicineservice: PharmacistService
  ) {}

  ngOnInit(): void {
    console.log(this.username);
    console.log('hello pharmacist ' + this.staffId);
    this.medicineservice.bindMedicineBill();
  }
  //logout function
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
