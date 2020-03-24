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
        public HttpResponseMessage Get([FromQuery] GetCSVQuery query)
        {
            var csv = this.handler.Handle(query).CSV;

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(csv, System.Text.Encoding.UTF8, "text/csv");
            return response;

            //var t.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            //return result.ToString();
        }
    }
}
