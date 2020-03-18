using CQRS.Commands;
using DomainModel.CQRS.Commands.AddPatientCommand;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewPositiveCaseController : ControllerBase
    {
        private readonly ICommandHandler<NewPositiveCommand> handler;

        public NewPositiveCaseController(ICommandHandler <NewPositiveCommand> handler)
        {
            this.handler = handler;
        }

        [HttpPost]
        public ActionResult Add([FromBody] NewPositiveCommand command)
        {
            handler.Handle(command);
            return Ok();
        }

    }
}