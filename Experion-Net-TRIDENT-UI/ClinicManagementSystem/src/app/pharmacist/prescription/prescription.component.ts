import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/auth.service';
import { PharmacistService } from '../../shared/services/pharmacist.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss'],
})
export class PrescriptionComponent implements OnInit {
  appointmentId: number = 0;
  //declare variables
  username = sessionStorage.getItem('userName');
  staffId = sessionStorage.getItem('staffId');
  medicineName: string;
  todayDate:Date=new Date();
  totalAmount:number=0;
  medicineBill:any;
  patchs:any;
  stoik:any;


  constructor(
    private router: Router,
    private authService: AuthService,
    public pharmService: PharmacistService,
    private route: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.params['id'];

    // console.log(this.appointmentId+" : "+this.pharmService.medadid);
    this.pharmService.bindListMedicineAdvicesById(this.appointmentId);
    this.pharmService.bindListMedicines();
    // this.pharmService.bindListMedicineAdvicesById(3);
  }
  //logout function
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  getStock(name) {
    this.medicineName = name;
    this.pharmService.bindListStock(this.medicineName);
  }

  UpdateStock()
  {

  }

  GenBill()
  {
    if(confirm("Do you want to  Generate Bill ? You can no longer Update Tests"))
    {   
      for(let i=0;i<this.pharmService.medAdvice[0].medicineList.length;i++)
    this.totalAmount=this.totalAmount+(this.pharmService.medAdvice[0].medicineList[i].MedicinePrice*this.pharmService.medAdvice[0].medicineList[i].Quantity);
    this.totalAmount;
    var datepipe = new DatePipe('en-UK');
    let formattedDate: any = datepipe.transform(Date.now(), 'yyyy-MM-dd');
    this.medicineBill = {};
    this.medicineBill.AppointmentId = +this.appointmentId;
    this.medicineBill.MedicineAdviceId = +this.pharmService.medadid;
    this.medicineBill.MedicineBillDate = formattedDate;
    this.medicineBill.TotalAmount = +this.totalAmount;
    console.log(this.medicineBill);
    let newStock=0;

    for(let i=0;i<this.pharmService.medAdvice[0].medicineList.length;i++)
    {
      this.pharmService.fetchStock(this.pharmService.medAdvice[0].medicineList[i].Medicine).subscribe(
        (res)=>{this.stoik=res as any
          //Fetching Stock
       newStock=this.stoik.Stock-this.pharmService.medAdvice[0].medicineList[i].Quantity
       console.log('Current Stock:'+this.stoik.Stock+' New Stock :'+newStock)
       this.patchs=[{'value':+newStock,'path':'stock','op':'replace'}];
       // Updating Stock
        this.pharmService.updateMedStock(this.pharmService.medAdvice[0].medicineList[i].Medicine,this.patchs).subscribe(
         (res)=>{console.log(res)
        },(error)=>{console.log(error)} 
        );
      }
       ,(error)=>console.log(error)
      );
   
      }//For Loop Ends
    this.AddMedicineBill(this.medicineBill);
    this.router.navigateByUrl('/pharmacist');
    }
  }

  AddMedicineBill(medbill: any) {
    this.pharmService.insertMedicineBill(medbill).subscribe(
      (res) => {
        console.log(res);
        console.log('Inserted Medicine Bill');
        this.UpdateMedBill();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  UpdateMedBill()
  {
   
    this.patchs=[{'value':2,'path':'status','op':'replace'}];
    this.pharmService.updateMedAdvice(this.pharmService.medadid,this.patchs).subscribe(
      (result)=>{
        console.log(result);
        this.pharmService.bindListMedicineAdvices();
        this.toaster.success("Successfully Generated Bill","Pharmacist");
      },
      (error)=>{
        console.log(error);
      }
    );
  console.log("Patch Sucessfully");
 }
  }

