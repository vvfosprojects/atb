using CQRS.Queries;
using DomainModel.CQRS.Queries.GetPatient;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientSheetController : ControllerBase
    {
        private readonly IQueryHandler<GetPatientQuery, GetPatientQueryResult> handler;

        public PatientSheetController(IQueryHandler<GetPatientQuery, GetPatientQueryResult> handler)
        {
            this.handler = handler;
        }

        public ActionResult<GetPatientQueryResult> Get([FromQuery]int caseNumber)
        {
            var query = new GetPatientQuery() { CaseNumber = caseNumber };

            return Ok(this.handler.Handle(query)); 
        }
    }
}