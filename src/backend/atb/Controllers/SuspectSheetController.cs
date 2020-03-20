using CQRS.Queries;
using DomainModel.Classes;
using DomainModel.CQRS.Queries.GetSuspect;
using Microsoft.AspNetCore.Mvc;
using System;

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

        public ActionResult<Object> Get([FromQuery]int caseNumber)
        {
            var query = new GetSuspectQuery() { CaseNumber = caseNumber };
            var suspect = this.handler.Handle(query);

            var result = new
            {
                Group = suspect.Suspect.Group,
                Subject = new Anagrafica()
                {
                    Nome = suspect.Suspect.Subject.Nome,
                    Cognome = suspect.Suspect.Subject.Cognome,
                    Email = suspect.Suspect.Subject.Email,
                    Number = suspect.Suspect.Subject.Number,
                    Phone = suspect.Suspect.Subject.Phone,
                    Role = suspect.Suspect.Subject.Role
                },
                Data = new SuspectData()
                {
                    ActualWorkReturnDate = suspect.Suspect.Data[suspect.Suspect.Data.Count - 1].ActualWorkReturnDate,
                    ClosedCase = suspect.Suspect.Data[suspect.Suspect.Data.Count - 1].ClosedCase,
                    ExpectedWorkReturnDate = suspect.Suspect.Data[suspect.Suspect.Data.Count - 1].ExpectedWorkReturnDate,
                    QuarantinePlace = suspect.Suspect.Data[suspect.Suspect.Data.Count - 1].QuarantinePlace,
                    UpdatedBy = suspect.Suspect.Data[suspect.Suspect.Data.Count - 1].UpdatedBy,
                    UpdateTime = suspect.Suspect.Data[suspect.Suspect.Data.Count - 1].UpdateTime
                }
            };

            return Ok(result);
        }
    }
}