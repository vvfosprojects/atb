using CQRS.Queries;
using DomainModel.CQRS.Queries.GetSheetCounters;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SheetCountersController : ControllerBase
    {
        private readonly IQueryHandler<GetSheetCountersQuery, GetSheetCountersQueryResult> handler;

        public SheetCountersController(IQueryHandler<GetSheetCountersQuery, GetSheetCountersQueryResult> handler)
        {
            this.handler = handler;
        }

        [HttpGet]
        public ActionResult<GetSheetCountersQueryResult> Get([FromQuery]GetSheetCountersQuery query)
        {
            var result = this.handler.Handle(query);

            return Ok(result);
        }
    }
}