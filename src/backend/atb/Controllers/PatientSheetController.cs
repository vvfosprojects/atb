using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.CQRS.Queries.GetPatient;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientSheetController : ControllerBase
    {
        private readonly IQueryHandler<GetPatientQuery, GetPatientQueryResult> handler;

        public PatientSheetController(IQueryHandler<GetPatientQuery, GetPatientQueryResult> handler)
        {
            this.handler = handler;
        }

        public ActionResult<Object> Get([FromQuery]int caseNumber)
        {
            var query = new GetPatientQuery() { CaseNumber = caseNumber };

            var patient = this.handler.Handle(query);
            var lastPatientData = patient.Patient.Data.Last();
            var result = new
            {
                Group = patient.Patient.Group,
                Subject = new Anagrafica()
                {
                    Nome = patient.Patient.Subject.Nome,
                    Cognome = patient.Patient.Subject.Cognome,
                    Email = patient.Patient.Subject.Email,
                    Number = patient.Patient.Subject.Number,
                    Phone = patient.Patient.Subject.Phone,
                    Role = patient.Patient.Subject.Role
                },
                Data = new PositiveData()
                {
                    EstremiProvvedimentiASL = lastPatientData.EstremiProvvedimentiASL,
                    ActualWorkReturnDate = lastPatientData.ActualWorkReturnDate,
                    ExpectedWorkReturnDate = lastPatientData.ExpectedWorkReturnDate,
                    QuarantinePlace = lastPatientData.QuarantinePlace,
                    UpdatedBy = lastPatientData.UpdatedBy,
                    UpdateTime = lastPatientData.UpdateTime
                }
            };

            return Ok(result);
        }
    }
}