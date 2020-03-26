using System;
using System.Collections.Generic;
using System.Linq;
using CQRS.Queries;
using DomainModel.CQRS.Queries.GetSheetsByGroup;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SheetsController : ControllerBase
    {
        private readonly IQueryHandler<GetSheetsByGroupQuery, GetSheetsByGroupQueryResult> handler;

        public SheetsController(IQueryHandler<GetSheetsByGroupQuery, GetSheetsByGroupQueryResult> handler)
        {
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
        }

        [HttpGet]
        public ActionResult<SubjectSheets> Get([FromQuery]GetSheetsByGroupQuery query)
        {
            var collection = this.handler.Handle(query).AllSheets;

            var patients = new List<Object>();
            var suspects = new List<Object>();

            foreach(var patient in collection.Patients)
            {
                patients.Add(new 
                {
                    patient.Group,
                    patient.Subject,
                    Data = patient.Data.Last()
                });
            };

            foreach(var suspect in collection.Suspects)
            {
                suspects.Add(new
                {
                    suspect.Group,
                    suspect.Subject,
                    Data = suspect.Data.Last()
                });
            }

            return Ok(new SubjectSheets() { Patients = patients.ToArray(), Suspects = suspects.ToArray()});
        }
    }
}