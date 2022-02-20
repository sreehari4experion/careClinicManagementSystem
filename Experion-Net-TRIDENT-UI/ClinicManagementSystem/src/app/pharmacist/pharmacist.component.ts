import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { PharmacistService } from '../shared/services/pharmacist.service';

@Component({
  selector: 'app-pharmacist',
  templateUrl: './pharmacist.component.html',
  styleUrls: ['./pharmacist.component.scss'],
})
export class PharmacistComponent implements OnInit {
  //declare variables
  username = sessionStorage.getItem('userName');
  staffId = sessionStorage.getItem('staffId');
  page: number = 1;
  filter: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    public pharmService: PharmacistService
  ) {}

  ngOnInit(): void {
    console.log(this.username);
    console.log('hello pharmacist ' + this.staffId);
    this.pharmService.bindListMedicineAdvices();
    
  }
  //logout function
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  //view patient details
  updatePrescription(id: number) {
    this.router.navigate(['prescription', id]);
    console.log(id);
  }
}
