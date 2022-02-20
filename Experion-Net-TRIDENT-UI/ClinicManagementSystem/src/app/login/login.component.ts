import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Staff } from '../shared/class/staff';
import { User } from '../shared/class/user';
import { AuthService } from '../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //declare variables
  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser: any = new User();

  //icons
  faCoffee = faCoffee;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    //creates a reactive form model
    this.loginForm = this.formBuilder.group({
      //FormControlname Fields
      LoginId: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
    console.log(this.loginForm.value);
  }
  get formControls() {
    return this.loginForm.controls;
  }

  //login verify
  loginCredentials() {
    console.log('hello login');
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid');
    }
    if (this.loginForm.valid) {
      console.log('valid form');
      //calling login method authservice for authentication and authorise
      this.authService.loginVerify(this.loginForm.value).subscribe((data) => {
        console.log(data);
        console.log('data returned');
        this.loginUser = data;

        //username,rolid and token
        sessionStorage.setItem('userName', this.loginUser.LoginId);
        sessionStorage.setItem('accessRole', this.loginUser.RoleId);
        sessionStorage.setItem('token', this.loginUser.token);
        sessionStorage.setItem('staffId', this.loginUser.StaffId);
        console.log(sessionStorage.getItem('userName'));
        console.log(sessionStorage.getItem('accessRole'));
        console.log(sessionStorage.getItem('token'));
        console.log(sessionStorage.getItem('staffId'));

        //check the role based on roleid
        if (this.loginUser.RoleId === 1) {
          console.log('Doctor');
          localStorage.setItem('userName', this.loginUser.LoginId);
          localStorage.setItem('accessRole', this.loginUser.RoleId.toString());
          sessionStorage.setItem('userName', this.loginUser.LoginId);
          console.log('Redirecting to Doctor');
          sessionStorage.setItem(
            'accessRole',
            this.loginUser.RoleId.toString()
          );
          sessionStorage.setItem('token', this.loginUser.token);
          sessionStorage.setItem('staffId', this.loginUser.StaffId.toString());
          this.router.navigateByUrl('/doctor');
        } else if (this.loginUser.RoleId === 5) {
          console.log('Pharmacist');
          localStorage.setItem('userName', this.loginUser.LoginId);
          localStorage.setItem('accessRole', this.loginUser.RoleId.toString());
          sessionStorage.setItem('userName', this.loginUser.LoginId);
          sessionStorage.setItem(
            'accessRole',
            this.loginUser.RoleId.toString()
          );
          sessionStorage.setItem('token', this.loginUser.token);
          sessionStorage.setItem('staffId', this.loginUser.StaffId.toString());
          this.router.navigateByUrl('/pharmacist');
        } else if (this.loginUser.RoleId === 4) {
          console.log('Lab-Technician');
          localStorage.setItem('userName', this.loginUser.LoginId);
          localStorage.setItem('accessRole', this.loginUser.RoleId.toString());
          sessionStorage.setItem('userName', this.loginUser.LoginId);
          console.log('Redirecting to Lab Technician');
          sessionStorage.setItem(
            'accessRole',
            this.loginUser.RoleId.toString()
          );
          sessionStorage.setItem('token', this.loginUser.token);
          sessionStorage.setItem('staffId', this.loginUser.StaffId.toString());
          //this.router.navigateByUrl('/patient-list');
          this.router.navigateByUrl('/lab-technician');
        } else if (this.loginUser.RoleId === 3) {
          console.log('Receptionist');
          localStorage.setItem('userName', this.loginUser.LoginId);
          localStorage.setItem('accessRole', this.loginUser.RoleId.toString());
          sessionStorage.setItem('userName', this.loginUser.LoginId);
          console.log('Redirecting to Receptionist');
          this.router.navigateByUrl('/receptionist');
        } else if (this.loginUser.RoleId === 2) {
          console.log('System Admin');
          localStorage.setItem('userName', this.loginUser.LoginId);
          localStorage.setItem('accessRole', this.loginUser.RoleId.toString());
          sessionStorage.setItem('userName', this.loginUser.LoginId);
          console.log('Redirecting to Admin Panel');
          this.router.navigateByUrl('/admin');
        } else {
          this.error = 'Sorry not authorised to access this page';
          this.toastr.error(
            'Sorry not authorised to access this page',
            'Error'
          );
        }
      });
    }
  }
}
