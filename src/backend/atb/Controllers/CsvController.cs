using CQRS.Queries;
using DomainModel.CQRS.Queries.GetCSV;
using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<GetCSVQueryResult> Get([FromQuery] GetCSVQuery query)
        {
            var result = this.handler.Handle(query);
            return Ok(result);

            //var t.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            //return result.ToString();
        }
    }
}