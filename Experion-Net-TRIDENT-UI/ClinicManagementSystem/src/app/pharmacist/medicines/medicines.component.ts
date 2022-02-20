import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { PharmacistService } from '../../shared/services/pharmacist.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
})
export class MedicinesComponent implements OnInit {
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
    this.pharmService.bindListMedicines();
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  updateMedicine(medicineId: number) {
    console.log(medicineId);
    this.router.navigate(['editmedicines', medicineId]);
  }
  deleteMedicine(medicineId: number) {
    console.log(medicineId);
    this.pharmService.deleteMedicine(medicineId);
  }
}
