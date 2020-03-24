using CQRS.Queries;
using DomainModel.CQRS.Queries.GetCSV;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvController : ControllerBase
    {
        private readonly IQueryHandler<GetCSVQuery, GetCSVQueryResult> handler;

        public CsvController(IQueryHandler<GetCSVQuery, GetCSVQueryResult> handler)
        {
            this.handler = handler;
        }

        [HttpGet]
        public string Get([FromQuery] GetCSVQuery query)
        {
            var csv = this.handler.Handle(query).CSV;

            Response.ContentType = "text/plain";
            return csv;
        }
    }
}
