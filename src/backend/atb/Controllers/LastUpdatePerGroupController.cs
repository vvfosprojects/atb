using System;
using CQRS.Queries;
using DomainModel.CQRS.Queries.GetLastUpdatePerGroup;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LastUpdatePerGroupController : ControllerBase
    {
        private readonly IQueryHandler<GetLastUpdatePerGroupQuery, GetLastUpdatePerGroupQueryResult> handler;

        public LastUpdatePerGroupController(IQueryHandler<GetLastUpdatePerGroupQuery, GetLastUpdatePerGroupQueryResult> handler)
        {
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
        }

        [HttpGet]
        public string Get([FromQuery] GetLastUpdatePerGroupQuery query)
        {
            var csv = this.handler.Handle(query).CSV;

            Response.ContentType = "text/plain";

            return csv;
        }
    }
}