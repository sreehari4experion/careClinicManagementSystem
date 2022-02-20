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
    public class MedicineBillController : ControllerBase
    {
        private readonly IMedicinesBill _medicinebill;
        //constructor injection
        public MedicineBillController(IMedicinesBill medicinesBill)
        {
            _medicinebill = medicinesBill;
        }

        #region add medicine bill
        [HttpPost]
        //https://localhost:44381/api/MedicineBill/
        public async Task<int> AddMedicineBill(MedicineBill MedicineBill)
        {
            return await _medicinebill.AddMedicineBill(MedicineBill);
        }
        #endregion

        #region view medicine bills
        [HttpGet]
        [Route("ViewMedicineBills")]
        //https://localhost:44381/api/MedicineBill/ViewMedicineBills
        public async Task<List<MedicineBillView>> GetAllMedicineBills()
        {
            return await _medicinebill.GetAllMedicineBills();
        }
        #endregion

        #region view medicine bills by id
        [HttpGet]
        // [Authorize]
        [Route("MedicineBillsById/{id}")]
        //https://localhost:44381/api/MedicineBill/MedicineBillsById?id=1
        public async Task<MedicineBillView> GetMedicineBillById(int id)
        {
            return await _medicinebill.GetMedicineBillById(id);
        }
        #endregion

        #region view medicine bill by patients mobile
        [HttpGet]
        // [Authorize]
        //https://localhost:44381/api/MedicineBill/MedicineBillsByPhone?phone=7865823568
        [Route("MedicineBillsByPhone/{phone}")]
        public async Task<MedicineBillView> GetMedicineBillByPhone(Int64 phone)
        {
            return await _medicinebill.GetMedicineBillByPhone(phone);
        }
        #endregion
    }

}
