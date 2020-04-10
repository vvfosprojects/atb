using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.CQRS.Queries.GetPatient;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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

        public ActionResult<Object> Get([FromQuery]int caseNumber, string group)
        {
            var query = new GetPatientQuery() { CaseNumber = caseNumber, Group = group };
            var history = new List<Object>();

            var patient = this.handler.Handle(query);
            if (patient.Patient.Data.Any())
            {

                foreach (var update in patient.Patient.Data.OrderByDescending(x => x.UpdateTime))
                {

                    int? convertedToSuspectCaseNumber = null;
                    if (update.Link != null) convertedToSuspectCaseNumber = update.Link.CaseNumber;
                    var convertedToSuspectSheetClosed = update.Link != null ? update.Link.Closed : false;

                    history.Add(new
                    {
                        update.QuarantinePlace,
                        update.ExpectedWorkReturnDate,
                        ConvertedToSuspectCaseNumber = convertedToSuspectCaseNumber,
                        ConvertedToSuspectSheetClosed = convertedToSuspectSheetClosed,
                        update.UpdateTime,
                        update.UpdatedBy
                    });
                }

                var lastPatientData = patient.Patient.Data.Last();
                var result = new
                {
                    patient.Patient.Group,
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
                        DiseaseConfirmDate = lastPatientData.DiseaseConfirmDate,
                        DateOfDeath = lastPatientData.DateOfDeath,
                        Link = lastPatientData.Link,
                        UpdatedBy = lastPatientData.UpdatedBy,
                        UpdateTime = lastPatientData.UpdateTime
                    },
                    History = history
                };

                return Ok(result);
            }
            else
            {
                var result = new
                {
                    patient.Patient.Group,
                    Subject = new Anagrafica()
                    {
                        Nome = patient.Patient.Subject.Nome,
                        Cognome = patient.Patient.Subject.Cognome,
                        Email = patient.Patient.Subject.Email,
                        Number = patient.Patient.Subject.Number,
                        Phone = patient.Patient.Subject.Phone,
                        Role = patient.Patient.Subject.Role
                    }
                };
                return Ok(result);
            }
        }
    }
}