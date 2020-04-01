using CQRS.Commands;
using DomainModel.CQRS.Commands.UpdatePositive;
using DomainModel.Services;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdatePositiveController : ControllerBase
    {
        private readonly ICommandHandler<UpdatePositiveCommand> handler;

        public UpdatePositiveController(ICommandHandler<UpdatePositiveCommand> handler)
        {
            this.handler = handler;
        }

        [HttpPost]
        public ActionResult Update([FromBody] UpdatePositiveCommand command)
        {
            this.handler.Handle(command);
            return Ok();
        }
    }
}