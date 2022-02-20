import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LabtTestService } from 'src/app/shared/services/labt-test.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  loggedUser:string;
  tID:number;
  newAttribute: any = {};
  ID:number = 0;
  constructor(private authService: AuthService,public labtestService:LabtTestService,private router: Router, 
    private toasterService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    
    this.loggedUser = localStorage.getItem("userName");

    //get bID from ActivateRoute
    this.tID = this.route.snapshot.params['tID'];

    //get book by id
    if(this.tID != 0 || this.tID != null){
      console.log(this.tID);

      //call method  get patient by id for updation
      this.labtestService.getTest(this.tID).subscribe(
        response =>{
          console.log(response);
          this.labtestService.formDataOne = Object.assign({},response);
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

    let addId = this.labtestService.formDataOne.TestId;
    // INSERT OR UPDATE
    if(addId == 0 || addId == null){
      //INSERT
      this.insertTestRecord(form);
     // this.labtestService.resetForm();     
    }
    else{
      //UPDATE     
      this.updateTestRecord(form);
      //this.labtestService.resetForm();  
    }
  }


  
  //insert Method
  insertTestRecord(form?: NgForm){
    console.log("Inserting a record...");
    this.labtestService.insertTest(form.value).subscribe(
      (result) => {
        console.log(result);
        this.toasterService.success('Test record has been inserted','CMS App 2022');
        form.reset();
      },
      (error)=>{
        console.log(error);
      }
    );
  }


  //update Method
  updateTestRecord(form?: NgForm){
    console.log("updating a record...");
    this.labtestService.updateTest(form.value).subscribe(
      (result) => {
        console.log(result);
        this.toasterService.success('Test record has been updated','CMS App -2022');
        form.reset();
        //this.router.navigateByUrl("/test");
        //call reset form for clear the content
        //this.labtestService.resetForm();
        
        
        
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  //logout
  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
