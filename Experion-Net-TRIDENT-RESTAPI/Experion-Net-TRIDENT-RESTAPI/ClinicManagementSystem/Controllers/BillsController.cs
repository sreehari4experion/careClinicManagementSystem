﻿using ClinicManagementSystem.Models;
using ClinicManagementSystem.Repository.Bills;
using ClinicManagementSystem.View_Models.Bills;
using ClinicManagementSystem.ViewModels.Bills;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClinicManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillsController : ControllerBase
    {
        private readonly IBill _bill;
        public BillsController(IBill Bill)
        {
            _bill = Bill;
        }

        #region view all bills
        [HttpGet]
        public async Task<List<FinalBillView>> GetAllBills()
        {
            return await _bill.GetAllBills();
        }
        #endregion

        #region add bill
        [HttpPost]
        public async Task<int> AddBill(Bill bill)
        {
            return await _bill.AddBill(bill);
        }
        #endregion

        #region view bill by id
        [HttpGet]
        [Route("ViewBillsById/{id}")]
        //https://localhost:44381/api/Bills/ViewBillsById?id=1
        public async Task<FinalBillView> GetBillById(int id)
        {
            return await _bill.GetBillById(id);
        }
        #endregion

        #region view bill by patient mobile
        [HttpGet]
        [Route("ViewBillsByPhone/{phone}")]
        //https://localhost:44381/api/Bills/ViewBillsByPhone?phone=87590867453
        public async Task<FinalBillView> GetBillByPhone(Int64 phone)
        {
            return await _bill.GetBillByPhone(phone);
        }
        #endregion
        [HttpGet]
        [Route("UserBill")]
        public async Task<List<FinalBillView>> GetBillByAppointment()
        {
            return await _bill.GetBillByAppointment();

        }
        [HttpGet]
        [Route("UserBill/{id}")]
        public async Task<BillIds> GetBillByAppointmentID(int id)
        {
            return await _bill.GetBillByAppointmentID(id);
        }
    }
}
