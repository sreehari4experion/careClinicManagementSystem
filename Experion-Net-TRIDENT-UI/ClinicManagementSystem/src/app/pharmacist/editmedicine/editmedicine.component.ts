import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { PharmacistService } from '../../shared/services/pharmacist.service';

@Component({
  selector: 'app-editmedicine',
  templateUrl: './editmedicine.component.html',
  styleUrls: ['./editmedicine.component.scss'],
})
export class EditmedicineComponent implements OnInit {
  //declare variables
  username = sessionStorage.getItem('userName');
  staffId = sessionStorage.getItem('staffId');
  medicineId: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    public pharmService: PharmacistService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //get employee id from activateRoute
    this.medicineId = this.route.snapshot.params['id'];
    console.log('medicine id is: ' + this.medicineId);

    //get medicine by id
    if (this.medicineId != 0 || this.medicineId != null) {
      //get employee
      this.pharmService.getMedicineById(this.medicineId).subscribe((res) => {
        console.log(res);
        this.pharmService.formData = Object.assign({}, res);
      });
    }
  }
  //submit form
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.pharmService.formData.MedicineId;
    if (addId == 0 || addId == null) {
      this.insertMedRecord(form);
      console.log('posted');

      this.resetForm(form);
    } else {
      //update
      console.log('updated');
      this.updateMedRecord(form);
      this.resetForm(form);
      this.showSuccess();
    }
    //insert or update
  }
  //insert method
  insertMedRecord(form: NgForm) {
    console.log('inserted record');
    this.pharmService.insertMedicine(form.value).subscribe(
      (res) => {
        console.log(res);
        this.showSuccess();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //update employee record
  updateMedRecord(form: NgForm) {
    console.log('updated record');
    this.pharmService.updateMedicine(form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('success put');
        this.showSuccess();
        this.router.navigateByUrl('/medicines');
      },
      (error) => {
        console.log(error);
        console.log('error');
      }
    );
  }

  //clear all contents after submit-- initialise
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

  showSuccess() {
    this.toastr.success('Medicine Updated Successfully', 'Success!');
  }
  showFailure() {
    this.toastr.error('Medicine Updated Failed', 'Failure!');
  }
}
