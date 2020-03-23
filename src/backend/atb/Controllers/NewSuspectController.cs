using CQRS.Commands;
using DomainModel.CQRS.Commands.NewSuspectCommand;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewSuspectController : ControllerBase
    {
        private readonly ICommandHandler<NewSuspectCommand> handler;

        public NewSuspectController(ICommandHandler<NewSuspectCommand> handler)
        {
            this.handler = handler;
        }

        [HttpPost]
        public ActionResult Add ([FromBody] NewSuspectCommand command)
        {
            var suspect = new NewSuspectCommand()
            {
                Number = command.Number
            };

            handler.Handle(command);
            
            return Ok(command.Number);
        }
    }
}