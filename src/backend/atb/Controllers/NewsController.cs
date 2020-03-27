using CQRS.Queries;
using DomainModel.CQRS.Queries.GetNews;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly IQueryHandler<GetNewsQuery, GetNewsQueryResult> handler;

        public NewsController(IQueryHandler<GetNewsQuery, GetNewsQueryResult> handler)
        {
            this.handler = handler;
        }

        [HttpGet]
        public ActionResult<GetNewsQueryResult> Get([FromQuery] GetNewsQuery query)
        {
            var result = this.handler.Handle(query);

            return Ok(result);
        }
    }
}