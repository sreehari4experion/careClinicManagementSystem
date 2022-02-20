import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from 'src/app/shared/services/receptionist.service';

@Component({
  selector: 'app-addconsultation',
  templateUrl: './addconsultation.component.html',
  styleUrls: ['./addconsultation.component.scss']
})
export class AddconsultationComponent implements OnInit {
page:number=1;
consultbill:any;
appointment:any;
TotalAmounts:number=100;
  constructor(public receptionservice:ReceptionistService,private toaster:ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.receptionservice.bindListConsultation();
  }
  OnSubmit(id:number,amt:number)
  {
    if(amt<=0 || amt==null)
    {
    alert("Please Enter Valid Amount For Bill Id:"+id);
    }
    else
    {
    this.consultbill= {};
  

   this.consultbill.AppointmentId=id;
   var datepipe=new DatePipe("en-UK");
   let formattedDate:any=datepipe.transform(Date.now(),'yyyy-MM-dd');
   this.consultbill.DateOfBill=formattedDate;
   this.consultbill.TotalAmount=amt;
  //
  console.log("Adding Bill and Updating Appointment");
  console.log(this.consultbill);
  this.appointment=[{'value':4,'path':'status','op':'replace'}];
 //this.appointment=JSON.parse(this.appointment);
  console.log(this.appointment);
  this.addConsultationBill(this.consultbill);
  this.updateAppointment(id,this.appointment);
    }

  }
  addConsultationBill(cBill:any)
  {
    console.log('Adding Consultation Bill')
    this.receptionservice.AddConsultationBill(cBill).subscribe(
      (result)=>{
        console.log(cBill);
        console.log(result);
        this.toaster.success("Sucessfully Added","Consultation Bill");
        this.router.navigateByUrl('/receptionist');
        window.location.reload();
      },
      (error)=>{
        console.log(error);
      }
    );
   
  }
  updateAppointment(id,appoint:any)
  {
    console.log('Updating Appointment')
    this.receptionservice.UpdateAppointment(id,appoint).subscribe(
      (result)=>{
        console.log(appoint);
        console.log(result);
        this.toaster.info("Sucessfully Updated","Appointment Status");
        this.router.navigateByUrl('/receptionist');
      },
      (error)=>{
        console.log(error);
      }
    );
   
  }
}
