using CQRS.Queries;
using DomainModel.CQRS.Queries.GetSuspect;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuspectSheetController : ControllerBase
    {
        private readonly IQueryHandler<GetSuspectQuery, GetSuspectQueryResult> handler;

        public SuspectSheetController(IQueryHandler<GetSuspectQuery, GetSuspectQueryResult> handler)
        {
            this.handler = handler;
        }

        public ActionResult<GetSuspectQueryResult> Get([FromQuery]int caseNumber)
        {
            var query = new GetSuspectQuery() { CaseNumber = caseNumber };

            return Ok(this.handler.Handle(query));
        }
    }
}