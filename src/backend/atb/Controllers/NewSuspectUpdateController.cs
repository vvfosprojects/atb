using CQRS.Commands;
using DomainModel.CQRS.Commands.NewSuspectUpdate;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewSuspectUpdateController : ControllerBase
    {
        private readonly ICommandHandler<NewSuspectUpdateCommand> handler;

        public NewSuspectUpdateController(ICommandHandler<NewSuspectUpdateCommand> handler)
        {
            this.handler = handler;
        }

        [HttpPost]
        public ActionResult Add([FromBody]NewSuspectUpdateCommand command)
        {
            handler.Handle(command);

            ///Mi manca da restituire il riferimento alla scheda positiva in caso esista o null in caso contrario

            return Ok(new { PositiveSheetNum = command.PositiveSheetNum });
        }
    }
}