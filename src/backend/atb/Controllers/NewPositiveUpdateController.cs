using CQRS.Commands;
using DomainModel.CQRS.Commands.NewPositiveUpdate;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewPositiveUpdateController : ControllerBase
    {
        private readonly ICommandHandler<NewPositiveUpdateCommand> handler;

        public NewPositiveUpdateController(ICommandHandler<NewPositiveUpdateCommand> handler)
        {
            this.handler = handler;
        }

        [HttpPost]
        public ActionResult Add([FromBody]NewPositiveUpdateCommand command)
        {
            handler.Handle(command);
            return Ok(new {command.SuspectSheetNum});
        }
    }
}