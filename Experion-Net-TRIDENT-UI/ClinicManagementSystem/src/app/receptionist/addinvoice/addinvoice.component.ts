import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from 'src/app/shared/services/receptionist.service';


@Component({
  selector: 'app-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.scss']
})


export class AddinvoiceComponent implements OnInit {
page:number=1;
filter:string;
bill:any={};
consultid:number=0;
medicineid:number=0;
labbillId:number=0;
appid:number;
patch:any;
  constructor(public receptionservice:ReceptionistService,private toaster:ToastrService) { }


  ngOnInit(): void {
    this.receptionservice.bindFinalInvoiceList();
  }

  Submit(aid:number,total:number)
  {
    var datepipe=new DatePipe("en-UK");
   let formattedDate:any=datepipe.transform(Date.now(),'yyyy-MM-dd');
  alert('Appointment Id:'+aid+'and Total:'+total);
  this.appid=aid;
  this.receptionservice.getABill(aid).subscribe(
    (res)=>{console.log(res); //this.bill=res as any;

      this.consultid=res.ConsultancyBillId;
      this.labbillId=res.LabTestBillId;
      this.medicineid=res.MedicineBillId;
      console.log("Consultation Id:"+this.consultid+" Lab Bill id:"+this.labbillId+"Medicine Bill Id:"+this.medicineid);
      if(this.labbillId==0 && this.medicineid==0)
      {
        this.bill.ConsultancyBillId=this.consultid;
        this.bill.BillDate=formattedDate;
        this.bill.TotalAmount=total;
        this.addBill(this.bill);
      }
      else if(this.medicineid==0 && this.labbillId>0)
      {
        this.bill.ConsultancyBillId=this.consultid;
        this.bill.LabTestBillId=this.labbillId;
        this.bill.BillDate=formattedDate;
        this.bill.TotalAmount=total;
        this.addBill(this.bill);
      }
      else if(this.medicineid>0 && this.labbillId==0)
      {
        this.bill.ConsultancyBillId=this.consultid;
        this.bill.MedicineBillId=this.medicineid;
        this.bill.BillDate=formattedDate;
        this.bill.TotalAmount=total;
        this.addBill(this.bill);
      }
      else
      {
        this.bill.ConsultancyBillId=this.consultid;
        this.bill.MedicineBillId=this.medicineid;
        this.bill.LabTestBillId=this.labbillId;
        this.bill.BillDate=formattedDate;
        this.bill.TotalAmount=total;
        this.addBill(this.bill);
      }
    },
    (error)=>{console.log(error)}
    );

  }
addBill(bill:any)
{
  this.receptionservice.AddFinalBill(bill).subscribe(
    (res)=>{console.log('Added Final Bill');
    this.updateApp(this.appid);
  },
    (error)=>{console.log('Insert Failed')}
  );

}
updateApp(aid:number)
{
  this.patch=[{'value':5,'path':'status','op':'replace'}];
  console.log('Updating Appointment')
    this.receptionservice.UpdateAppointment(aid,this.patch).subscribe(
      (result)=>{
        console.log(result);
        this.toaster.info("Sucessfully Added Final Bill","Final Bill");
        this.receptionservice.bindFinalInvoiceList();
      },
      (error)=>{
        console.log(error);
      }
    );
}
}
