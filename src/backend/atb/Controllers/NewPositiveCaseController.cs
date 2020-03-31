using CQRS.Commands;
using DomainModel.CQRS.Commands.NewPositiveCase;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewPositiveCaseController : ControllerBase
    {
        private readonly ICommandHandler<NewPositiveCaseCommand> handler;

        public NewPositiveCaseController(ICommandHandler <NewPositiveCaseCommand> handler)
        {
            this.handler = handler;
        }

        [HttpPost]
        public ActionResult Add([FromBody] NewPositiveCaseCommand command)
        {
            var patient = new NewPositiveCaseCommand()
            {
                Number = command.Number
            };

            handler.Handle(command);

            return Ok(new { CaseNumber = command.Number });
        }
    }
}