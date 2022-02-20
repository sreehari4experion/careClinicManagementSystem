import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LabtTestService } from 'src/app/shared/services/labt-test.service';

@Component({
  selector: 'app-test-advice-list',
  templateUrl: './test-advice-list.component.html',
  styleUrls: ['./test-advice-list.component.scss']
})
export class TestAdviceListComponent implements OnInit {
tID:number=0;
  loggedUser:string;
  TestReport:any={};
  TestValue:number=0;
  totalAmount:number=0;
  LabBill:any;
  patch:any; //patch
  patchs:any;//patch
  constructor(private authService: AuthService,public labtestService:LabtTestService,private router: Router,private route: ActivatedRoute,private toaster:ToastrService) { }
  page:number=1;
  filter:string;
 btn;

  ngOnInit(): void {
    this.tID = this.route.snapshot.params['tID'];
    this.loggedUser = localStorage.getItem("userName");
    this.labtestService.bindListReportsById(this.tID);
    this.labtestService.appointId;
    
  }

  //logout
  logOut(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
  UpdatePatchs(tid:number,pa:any)
{
  console.log(pa);
  this.labtestService.updateLabReportTests(tid,pa).subscribe(
    (result)=>{
      console.log(result);
      this.labtestService.bindListReportsById(this.tID);
      this.toaster.info("Sucessfully Updated","Lab Test Value");

    },
    (error)=>{
      console.log(error);
    }
  );
}
  Submit(no:number,Testid:number)
  {
    //alert(no+" |"+tid);
    if(confirm("Do you want to  Update the Test Value ?"))
    {   
      console.log(Testid);
      this.patch=[{'value':+no,'path':'testValue','op':'replace'}];
      console.log(this.patch);
     this.UpdatePatchs(Testid,this.patch);
    console.log("Patch Sucessfully");
   // this.toaster.info("Patient is Serviced ","Doctor ");
    // Navigate Back
   }
  }

  GenBill()
  {
    console.log(this.labtestService.appointId);
    for(let i=0;i<this.labtestService.testreps[0].TestDetails.length;i++)
    this.totalAmount=this.totalAmount+this.labtestService.testreps[0].TestDetails[i].Price;
    console.log(this.totalAmount);
    var datepipe=new DatePipe("en-UK");
    let formattedDate:any=datepipe.transform(Date.now(),'yyyy-MM-dd');
    this.LabBill={};
    this.LabBill.AppointmentId=+ this.labtestService.appointId;
    this.LabBill.TestReportId=+this.tID
    this.LabBill.Date=formattedDate;
    this.LabBill.TotalAmount=+this.totalAmount;
     console.log(this.LabBill);
    this.AddLabBill(this.LabBill);
  }

  AddLabBill(bill:any)
  {
    this.labtestService.insertLabBill(bill).subscribe(
      (res) => {
        console.log(res);
        console.log("Inserted Lab Bill");
        this.UpdateReports();
      },
      (error) => {
        console.log(error);
      }
    );
  }
UpdateReports()
{
  if(confirm("Do you want to  Generate Bill ? You can no longer Update Tests"))
  {   
    this.patchs=[{'value':2,'path':'status','op':'replace'}];
    this.labtestService.updateLabReport(this.tID,this.patchs).subscribe(
      (result)=>{
        console.log(result);
        this.labtestService.bindListReports();
        this.toaster.success("Successfully Generated Bill","Lab Technician");
        this.router.navigateByUrl('/lab-technician');
      },
      (error)=>{
        console.log(error);
      }
    );

  console.log("Patch Sucessfully");
 // this.toaster.info("Patient is Serviced ","Doctor ");
  // Navigate Back
 }
}
btnShow()
{
  (document.getElementById('btn') as HTMLInputElement).disabled = false;
}

}
