import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Notes } from 'src/app/shared/class/notes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Test } from 'src/app/shared/class/test';
import { Medicinedetails } from 'src/app/shared/class/medicinedetails';
import { Testdetails } from 'src/app/shared/class/testdetails';
import { ReactiveFormsModule } from '@angular/forms';
import { Appointments } from 'src/app/shared/class/appointments';

@Component({
  selector: 'app-viewappointment',
  templateUrl: './viewappointment.component.html',
  styleUrls: ['./viewappointment.component.scss'],
})
export class ViewappointmentComponent implements OnInit {
  // visible non visible
  visible: boolean = false;
  show: boolean = false;
  buttonTest: boolean = false;
  buttonTechnician: boolean = false;
  buttonPharmacist: boolean = false;
  buttonMed: boolean = false;
  testDrop = document.getElementById('testId') as HTMLSelectElement;
  //form declaration
  //1. form for notes
  notesForm: FormGroup;

  //declare variables
  username = sessionStorage.getItem('userName');
  staffId = sessionStorage.getItem('staffId');
  appointmentId: number = 0;
  patientId: number;
  DoctorId: number;
  appointmentDetails: Appointments[] = [];

  patch: any; // Updating Status
  //----Medicine Group-----------
  medicineAdvice: any;
  medicineDetails: any;
  MedDetails: Array<Medicinedetails> = [];
  MedQty: number = 0;
  MedId: number = 0;
  MedAdId: number = 0; // to show response of Medicine Advice
  //----------------------------
  testAdvice: any;
  testDetails: any;
  TestDetails: Array<Testdetails> = [];
  TestId: number = 0;
  TestAdId: number = 0; //to show response of Test Advice
  //------------------------------
  public patientDetails: Observable<any>;
  // form controls
  addPostForm!: FormGroup;
  isSubmitted = false;
  error = '';
  addedNote: any = new Notes();
  myNote: string = '';
  PharmID: number = 0;
  TechID: number = 0;

  //selected lab tests
  labTests: Array<Test> = [];
  prescriptions: any[] = [];
  //test
  TestName: string;

  //angular multiselect
  cars = [
    { id: 1, name: 'BMW Hyundai' },
    { id: 2, name: 'Kia Tata' },
    { id: 3, name: 'Volkswagen Ford' },
    { id: 4, name: 'Renault Audi' },
    { id: 5, name: 'Mercedes Benz Skoda' },
  ];

  selected = [{ id: 3, name: 'Volkswagen Ford' }];

  myTests: Test[] = [];
  Testform: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    public doctorService: DoctorService,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    public httpclient: HttpClient
  ) {}

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.params['id'];
    this.doctorService.getPatientId(this.appointmentId);
    this.patientId = this.doctorService.patientId;
    console.log('patient id' + this.patientId);
    this.getPatientID(this.appointmentId);

    // console.log('patient id prescription' + this.patientId);

    console.log('Binding Appointments');
    this.doctorService.bindListAppointmentsByID(+this.appointmentId);
    this.getAppointmentDetails(this.appointmentId);
    // console.log('patient is ' + this.doctorService);
    // get doctors notes

    console.log(
      'patient if from appointment is' + this.doctorService.patientId
    );

    // this.appointmentId = this.doctorService.appointmentId;

    this.notesForm = new FormGroup({
      NoteId: new FormControl(0),
      Note: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5),
      ]),
      DoctorId: new FormControl(+this.staffId),
      PatientId: new FormControl(+this.patientId),
      AppointmentId: new FormControl(+this.appointmentId),
    });

    console.log('patient details');
    this.doctorService.bindlistPatientNotes(+this.appointmentId);
    this.doctorService.BindPharmList();
    this.doctorService.BindTechnicianList();
    this.doctorService.bindListTests();
    this.doctorService.bindListMedicines();
  }
  //get form controls
  get formControls() {
    return this.notesForm.controls;
  }
  // ? form submission notes
  noteSubmit(notes) {
    console.log('notes submitted');
    console.log(notes);

    if (notes.NoteId == 0 || notes.NoteId == null) {
      this.doctorService.insertNotes(notes).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Success', 'Note Added');

          window.location.reload();
        },
        (err) => {
          console.log(err);
          this.toastr.error('Error', 'Note not Added');
        }
      );
    } else {
      this.doctorService.updateNotes(notes).subscribe(
        (res) => {
          console.log(res);
          this.toastr.success('Success', 'Note Updated');

          window.location.reload();
        },
        (err) => {
          console.log(err);
          this.toastr.error('Error', 'Note not Updated');
        }
      );
    }
  }
  //button show logics
  onChangetest(deviceValue) {
    console.log(deviceValue);
    console.log('changed test drop');
    this.buttonTest = true;
  }
  onChangeTechnician(deviceValue) {
    console.log(deviceValue);
    console.log('changed technician');
    this.buttonTechnician = true;
  }
  onChangePharmacist(deviceValue) {
    console.log(deviceValue);
    console.log('changed pharmacist drop');
    this.buttonPharmacist = true;
  }
  onChangeMed(deviceValue) {
    console.log(deviceValue);
    console.log('changed med drop');
    this.buttonMed = true;
  }

  //remove medicines from med list
  // removeMed(id: number) {
  //   this.MedDetails.splice(id, 1);
  //   console.log('medicine removed');
  // }

  //get appointment details
  getAppointmentDetails(id: number) {
    this.doctorService.getAppointmentDetails(id).subscribe(
      (res) => {
        this.appointmentDetails = res;
        console.log('appointment details');

        console.log(this.appointmentDetails);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //logout function
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.doctorService.formData.NoteId;
    if (addId == 0 || addId == null) {
      this.insertNote(form.value);
      console.log('posted the values');
      this.toastr.success('Success', 'Inserted');

      this.resetForm(form);
    } else {
      //update
      console.log('updated');
      this.updateNote(form);
      this.resetForm(form);
      this.toastr.success('Success', 'Updated');
    }
  }
  //insert method
  insertNote(form: NgForm) {
    console.log('inserted record');
    this.doctorService.insertNotes(form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('success post');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //update employee record
  updateNote(form: NgForm) {
    console.log('updated record');
    this.doctorService.updateNotes(form.value).subscribe(
      (res) => {
        console.log(res);
        console.log('success put');
      },
      (error) => {
        console.log(error);
        console.log('error');
      }
    );
  }

  //clear all contents after submit-- initialise
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

  //push labtest to labtest array
  addLabTest(test) {
    this.labTests.push(test);
    console.log(test.value);
    console.log('labtest added');
  }

  //push prescription to prescription array
  addPrescription(prescription) {
    this.prescriptions.push(prescription);
  }
  //============================Medicine Advice=========================
  addMedicineadvice(pharmId: number) {
    this.medicineAdvice = {};
    this.appointmentId = this.doctorService.appointmentId;
    this.medicineAdvice.AppointmentId = this.appointmentId;
    this.medicineAdvice.DoctorId = +this.staffId;
    this.medicineAdvice.PharmacistId = +pharmId;
    this.medicineAdvice.Status = +1;
    console.log(this.medicineAdvice);
    this.AddMedAdv(this.medicineAdvice);
    this.show = !this.show;
    this.toastr.success(
      'Medicine Advice ID Generated Successfully',
      'Success!'
    );
    //----------Adding Medicine Advice---------------
    //this.MedAdId=1;
    //alert('Appointment Id:'+this.appointmentId+' Doctor ID:'+this.staffId +' PharmId:'+pharmId);
  }
  AddMedAdv(medadv: any) {
    console.log('Inserting  Medicine Advice record');
    this.doctorService.insertMedicineAdvice(medadv).subscribe(
      (res) => {
        console.log(res);
        this.MedAdId = +res;
        console.log('Inserted Medicine Advice');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //============================Medicine Details=========================
  addMedPrescription(Mid: number, Mqty: number) {
    this.toastr.show('Added Medicine Id: ' + Mid + 'and Quantity : ' + Mqty);
    this.medicineDetails = {};
    this.medicineDetails.MedicineAdviceId = +this.MedAdId;
    this.medicineDetails.MedicineId = +Mid;
    this.medicineDetails.Quantity = +Mqty;
    console.log(this.medicineDetails);
    this.MedDetails.push(this.medicineDetails);
  }
  MedSubmit() {
    for (let i = 0; i < this.MedDetails.length; i++) {
      console.log(this.MedDetails[i]);
      this.doctorService.insertMedicineDetails(this.MedDetails[i]).subscribe(
        (res) => {
          console.log(res);
          console.log('Inserted Medicine Detail' + i);
          this.show = !this.show;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  //=====================Test Advice / Report=======================
  addLabTestAdvice(techId: number) {
    //alert('Appointment Id:'+this.appointmentId+' Doctor ID:'+this.staffId +' LabTechId:'+techId);
    this.testAdvice = {};
    this.testAdvice.AppointmentId = +this.doctorService.appointmentId;
    this.testAdvice.DoctorId = +this.staffId;
    this.testAdvice.LabTechnicianId = +techId;
    this.testAdvice.TestAmount = 0;
    this.testAdvice.Status = +1;
    console.log(this.testAdvice);
    this.AddTestAdv(this.testAdvice); //uncomment
    this.toastr.success('Test Advice ID Generated Successfully', 'Success!');
    // show div
    this.visible = !this.visible;
  }
  AddTestAdv(testadv: any) {
    console.log('Inserting  Test Advice record');
    this.doctorService.insertTestAdvice(testadv).subscribe(
      (res) => {
        console.log(res);
        this.TestAdId = +res;
        console.log('Inserted Test Advice');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //-------------------Test Details---------------
  addTestPrescription(TId: number) {
    // alert('Added Test Id: ' + TId);
    this.toastr.show('Added Test Id: ' + TId);
    this.testDetails = {};
    this.testDetails.TestId = +TId;
    this.testDetails.TestReportId = +this.TestAdId;
    this.testDetails.TestValue = 0;
    this.TestDetails.push(this.testDetails);
  }
  TestSubmit() {
    for (let i = 0; i < this.TestDetails.length; i++) {
      console.log(this.TestDetails[i]);
      this.visible = !this.visible;
      this.doctorService.insertTestDetails(this.TestDetails[i]).subscribe(
        (res) => {
          console.log(res);
          console.log('Inserted Test Details' + i);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  //-----------------------------Mark as Done---------------------------------
  markAsDone() {
    if (confirm('Do you want to  Mark as Done ?')) {
      this.patch = [{ value: 3, path: 'status', op: 'replace' }];
      this.UpdatePath(this.doctorService.appointmentId, this.patch);
      console.log(this.patch);
      console.log(
        'Appointment :' + this.doctorService.appointmentId + 'is Marked Done'
      );
      // this.toaster.info("Patient is Serviced ","Doctor ");
      // Navigate Back
      // this.router.navigate(['/doctor']);
      // time out function
      setTimeout(() => {
        console.log('time out functionS');
        this.doctorService.navDoc();
      }, 4000);
    }
  }
  UpdatePath(aid: number, pah: any) {
    this.doctorService.UpdateAppointment(aid, pah).subscribe(
      (result) => {
        console.log(result);
        // alert('Patient Got Served');
        this.toastr.success('Patient Got Served', 'Doctor');
        this.toastr.info('Sucessfully Updated', 'Serviced Patient');
        this.router.navigateByUrl('/doctor');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteNote(id: number) {
    this.doctorService.bindDeleteNotes(id);
    this.toastr.success('Note Deleted Successfully', 'Success!');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  getPatientID(id: number) {
    this.doctorService.getPatient(id).subscribe((result) => {
      console.log(result);
      this.patientId = result[Object.keys(result)[0]] as number;
      console.log(this.patientId + 'is patient id here');
      // this.getPatientDetails(this.patientId);
      this.doctorService.bindListPatientsNotes(this.patientId);
      this.doctorService.bindlistPatientNotes(+this.patientId);

      this.notesForm = new FormGroup({
        NoteId: new FormControl(0),
        Note: new FormControl('', [
          Validators.required,
          Validators.maxLength(500),
          Validators.minLength(5),
        ]),
        DoctorId: new FormControl(+this.staffId),
        PatientId: new FormControl(+this.patientId),
        AppointmentId: new FormControl(+this.appointmentId),
      });
    });
  }

  addTestsTry() {
    this.Testform = new FormGroup({
      TestId: new FormControl(0),
      TestName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
      ]),
      TestAmount: new FormControl(0),
      TestReportId: new FormControl(0),
      TestValue: new FormControl(0),
    });
    this.myTests.push(this.Testform.value);
    console.log('myTests', this.myTests);
  }
  getValues() {
    console.log(this.selected);
  }
}
