import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from 'src/app/shared/services/receptionist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  page:number=1;
  filter:string;
  appointment:any;
  TodayDate;
  constructor(public receptionservice:ReceptionistService,private toaster:ToastrService) { }

  ngOnInit(): void {
    let todayDate = new Date();
    //let h=todayDate.getHours();
   // let m=todayDate.getMinutes();
   // this.receptionservice.bindListActiveAppointments();
   this.receptionservice.bindListTodayAppointments();
    this.TodayDate=new Date();

  }
 
  DeleteAppointment(id:number)
  {
    if(confirm("Do you want to Delete ?  Appointment no:"+id))
    {
      this.DeleteApp(id);
      this.toaster.error("Cancelled Appointment No:"+id,"Appointment Cancel");
      this.receptionservice.bindListTodayAppointments();
     }
    
}

DeleteApp(aid:number)
{
  /*this.receptionservice.DeleteAppointment(aid).subscribe(
    response=>{console.log(response);this.receptionservice.bindListTodayAppointments();
      this.receptionservice.appointcnt=this.receptionservice.appointcnt+1},
    error=>{console.log(error);
  } );*/
  this.appointment=[{'value':0,'path':'status','op':'replace'}];
  this.UpdateAppoint(aid,this.appointment);

}

  SendToDoctor(id:number,patientName:string,doctorName:string)
  {
    if(confirm("Do you want to Send  "+patientName+" To  Dr."+doctorName))
      {
        this.appointment=[{'value':2,'path':'status','op':'replace'}];
       this.UpdateAppoint(id,this.appointment);
      this.toaster.info("Sent "+patientName+" To Dr."+doctorName,"Appointment");
      this.receptionservice.bindListTodayAppointments();
     }
  }
  UpdateAppoint(id:number,appoint:any)
  {
    this.receptionservice.UpdateAppointment(id,appoint).subscribe(
      (result)=>{
        console.log(result);this.receptionservice.bindListTodayAppointments();
        //this.router.navigateByUrl('/receptionist');
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  getApppointments(date:Date)
  {
  this.receptionservice.bindAppointmentbyDate(date);
  }

}
