using CQRS.Commands;
using DomainModel.CQRS.Commands.UpdateSuspect;
using Microsoft.AspNetCore.Mvc;
using System;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateSuspectController : ControllerBase
    {
        private readonly ICommandHandler<UpdateSuspectCommand> handler;

        public UpdateSuspectController(ICommandHandler<UpdateSuspectCommand> handler)
        {
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
        }

        [HttpPost]
        public ActionResult Update([FromBody] UpdateSuspectCommand command)
        {
            this.handler.Handle(command);

            return Ok();
        }
    }
}