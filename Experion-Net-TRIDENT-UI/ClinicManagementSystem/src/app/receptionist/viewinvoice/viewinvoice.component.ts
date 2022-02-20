import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReceptionistService } from 'src/app/shared/services/receptionist.service';
import{NgxPrintModule} from 'ngx-print';

@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.scss']
})
export class ViewinvoiceComponent implements OnInit {
page:number=1;
filter:string;
  constructor(public receptionservice:ReceptionistService) { }

  ngOnInit(): void {
    this.receptionservice.bindListFinalBill();
  }
 

}
