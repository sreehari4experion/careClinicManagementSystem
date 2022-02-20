﻿using ClinicManagementSystem.Models;
using ClinicManagementSystem.Repository.Bills;
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
    public class ConsultationBillController : ControllerBase
    {
        private readonly IConsultancyBill _consulation;
        public ConsultationBillController(IConsultancyBill consultancyBill)
        {
            _consulation = consultancyBill;
        }

        #region add consultation bill
        [HttpPost]
        public async Task<int> AddConsulationBill(ConsultationBill consultationBill)
        {
            return await _consulation.AddConsulationBill(consultationBill);
        }
        #endregion

        #region view all bills
        [HttpGet]
        // [Authorize]
        [Route("ViewAllBills")]
        //https://localhost:44381/api/ConsultationBill/ViewAllBills
        public async Task<List<SubBillView>> GetConsultancyAllBills()
        {
            return await _consulation.GetConsultancyAllBills();
        }
        #endregion

        #region view bills by id
        [HttpGet]
        // [Authorize]
        [Route("ViewBillsById/{id}")]
        //https://localhost:44381/api/ConsultationBill/ViewBillById?id=1
        public async Task<SubBillView> GetConsultantionBillById(int id)
        {
            return await _consulation.GetConsultantionBillById(id);
        }
        #endregion

        #region view bill by patient mobile
        [HttpGet]
        [Route("ViewBillsByPhone/{phone}")]
       // https://localhost:44381/api/ConsultationBill/ViewBillByPhone?phone=96783454636
        public async Task<SubBillView> GetConsultantionBillByPhone(Int64 phone)
        {
            return await _consulation.GetConsultantionBillByPhone(phone);
        }
        #endregion
    }
}
