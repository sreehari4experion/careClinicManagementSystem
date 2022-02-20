import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from 'src/app/shared/services/receptionist.service';

@Component({
  selector: 'app-viewconsultation',
  templateUrl: './viewconsultation.component.html',
  styleUrls: ['./viewconsultation.component.scss']
})
export class ViewconsultationComponent implements OnInit {
  page:number=1;
  filter:string;
  constructor(public receptionservice:ReceptionistService) { }

  ngOnInit(): void {
    this.receptionservice.bindListConsultancyBill();
  }

}
