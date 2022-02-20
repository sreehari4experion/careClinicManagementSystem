import { Component, OnInit } from '@angular/core';
import{ReceptionistService} from '../../shared/services/receptionist.service'

@Component({
  selector: 'app-viewappointments',
  templateUrl: './viewappointments.component.html',
  styleUrls: ['./viewappointments.component.scss']
})
export class ViewappointmentsComponent implements OnInit {
  page:number=1;
  filter:string;
  constructor(public receptionservice:ReceptionistService) { }

  ngOnInit(): void {
    this.receptionservice.bindAppointmentByStatus(1);

  }
  Bind(id:number)
  {
  this.receptionservice.bindAppointmentByStatus(id);
  }

}
