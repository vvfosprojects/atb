using CQRS.Queries;
using DomainModel.CQRS.Queries.GetAllPositive;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AllPositiveSheetsController : ControllerBase
    {
        private readonly IQueryHandler<GetAllPositiveSheetsQuery, GetAllPositiveSheetsQueryResult> handler;

        public AllPositiveSheetsController(IQueryHandler<GetAllPositiveSheetsQuery, GetAllPositiveSheetsQueryResult> handler)
        {
            this.handler = handler;
        }

        public ActionResult<GetAllPositiveSheetsQueryResult> Get()
        {
            var query = new GetAllPositiveSheetsQuery() { };

            return Ok(this.handler.Handle(query));
        }

    }
}