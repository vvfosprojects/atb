using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.CQRS.Queries.GetPatient;
using Microsoft.AspNetCore.Mvc;
using System;

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
                    EstremiProvvedimentiASL = patient.Patient.Data[patient.Patient.Data.Count - 1].EstremiProvvedimentiASL,
                    ActualWorkReturnDate = patient.Patient.Data[patient.Patient.Data.Count - 1].ActualWorkReturnDate,
                    ClosedCase = patient.Patient.Data[patient.Patient.Data.Count - 1].ClosedCase,
                    ExpectedWorkReturnDate = patient.Patient.Data[patient.Patient.Data.Count - 1].ExpectedWorkReturnDate,
                    QuarantinePlace = patient.Patient.Data[patient.Patient.Data.Count - 1].QuarantinePlace,
                    UpdatedBy = patient.Patient.Data[patient.Patient.Data.Count - 1].UpdatedBy,
                    UpdateTime = patient.Patient.Data[patient.Patient.Data.Count - 1].UpdateTime
                }
            };

            return Ok(result); 
        }
    }
}