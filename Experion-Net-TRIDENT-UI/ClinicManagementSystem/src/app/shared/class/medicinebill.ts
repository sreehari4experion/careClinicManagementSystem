export class Medicinebill {
    MedicineBillId:number=0
    AppointmentDate:Date=new Date()
    ReceptionistName:string=''
    DoctorName:string=''  
    PatientName:string=''
    Phone:number=0
    Address:string=""
    DateOfBirth:Date=new Date()
    BloodGroup:string=""
    DateOfBill:Date=new Date()
    PharmacistName:string=""
    MedicinesList:any
    TotalAmount:number
}
