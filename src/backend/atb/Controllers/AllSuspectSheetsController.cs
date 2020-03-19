using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CQRS.Queries;
using DomainModel.CQRS.Queries.GetAllSuspect;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllSuspectSheetsController : ControllerBase
    {
        private readonly IQueryHandler<GetAllSuspectSheetsQuery, GetAllSuspectSheetsQueryResult> handler;

        public AllSuspectSheetsController(IQueryHandler<GetAllSuspectSheetsQuery, GetAllSuspectSheetsQueryResult> handler)
        {
            this.handler = handler;
        }

        public ActionResult<GetAllSuspectSheetsQueryResult> Get()
        {
            var query = new GetAllSuspectSheetsQuery() { };

            return Ok(this.handler.Handle(query));
        }
    }
}