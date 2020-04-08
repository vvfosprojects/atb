﻿using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.CQRS.Queries.GetSuspect;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuspectSheetController : ControllerBase
    {
        private readonly IQueryHandler<GetSuspectQuery, GetSuspectQueryResult> handler;

        public SuspectSheetController(IQueryHandler<GetSuspectQuery, GetSuspectQueryResult> handler)
        {
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
        }

        public ActionResult<Object> Get([FromQuery]int caseNumber, string group)
        {
            var query = new GetSuspectQuery() { CaseNumber = caseNumber, Group = group };
            var suspect = this.handler.Handle(query);
            if (suspect.Suspect.Data.Any())
            {
                var result = new
                {
                    suspect.Suspect.Group,
                    Subject = new Anagrafica()
                    {
                        Nome = suspect.Suspect.Subject.Nome,
                        Cognome = suspect.Suspect.Subject.Cognome,
                        Email = suspect.Suspect.Subject.Email,
                        Number = suspect.Suspect.Subject.Number,
                        Phone = suspect.Suspect.Subject.Phone,
                        Role = suspect.Suspect.Subject.Role
                    },
                    Data = new SuspectData()
                    {
                        ActualWorkReturnDate = suspect.Suspect.Data.Last().ActualWorkReturnDate,
                        ExpectedWorkReturnDate = suspect.Suspect.Data.Last().ExpectedWorkReturnDate,
                        QuarantinePlace = suspect.Suspect.Data.Last().QuarantinePlace,
                        HealthMeasure = suspect.Suspect.Data.Last().HealthMeasure,
                        UpdatedBy = suspect.Suspect.Data.Last().UpdatedBy,
                        UpdateTime = suspect.Suspect.Data.Last().UpdateTime,
                        Link = suspect.Suspect.Data.Last().Link
                    }
                };

                return Ok(result);
            }
            else
            {
                var result = new
                {
                    Group = suspect.Suspect.Group,
                    Subject = new Anagrafica()
                    {
                        Nome = suspect.Suspect.Subject.Nome,
                        Cognome = suspect.Suspect.Subject.Cognome,
                        Email = suspect.Suspect.Subject.Email,
                        Number = suspect.Suspect.Subject.Number,
                        Phone = suspect.Suspect.Subject.Phone,
                        Role = suspect.Suspect.Subject.Role
                    }
                };
                return Ok(result);
            }
        }
    }
}