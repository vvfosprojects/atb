using CQRS.Queries;
using DomainModel.CQRS.Queries.GetStatistics;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IQueryHandler<GetStatisticsQuery,GetStatisticsQueryResult> handler;

        public StatisticsController(IQueryHandler<GetStatisticsQuery, GetStatisticsQueryResult> handler)
        {
            this.handler = handler;
        }

        [HttpGet]
        public ActionResult<GetStatisticsQueryResult> Get([FromQuery] GetStatisticsQuery query)
        {
            var result = handler.Handle(query);
            return Ok(result);
        }
    }
}