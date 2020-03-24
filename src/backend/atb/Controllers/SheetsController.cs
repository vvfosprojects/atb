using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CQRS.Queries;
using DomainModel.CQRS.Queries.GetSheetsByGroup;
using Microsoft.AspNetCore.Http;
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
            this.handler = handler;
        }

        [HttpGet]
        public ActionResult<Object> Get(GetSheetsByGroupQuery query)
        {
            var collection = this.handler.Handle(query).AllSheets;
            var result = new List<Object>();

            foreach(var patient in collection.Patients)
            {
                result.Add(new 
                {
                    Group = patient.Group,
                    Subject = patient.Subject,
                    Data = patient.Data.Last()
                });
            };

            foreach(var suspect in collection.Suspects)
            {
                result.Add(new
                {
                    Group = suspect.Group,
                    Subject = suspect.Subject,
                    Data = suspect.Data.Last()
                });
            }

            return Ok(result);
        }
    }
}