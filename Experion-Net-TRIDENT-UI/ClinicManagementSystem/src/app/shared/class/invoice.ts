export class Invoice {
    BillId:number=0
    BillDate:Date=new Date()
    AppointmentDate:Date=new Date()
    ReceptionistName:string=""
    DoctorName:string=""
    PatientName:string=""
    Phone:number=0
    Address: string=""
    DateOfBirth:Date=new Date()
        BloodGroup:string="O+ve"
        ConsultationFee:number=0
        LabTestsFee:number=0
        MedicinesFee:number=0
        TotalAmount:number=0
}
