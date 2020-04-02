using System;
using CQRS.Commands;
using DomainModel.CQRS.Commands.KeepAlive;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KeepAliveController : ControllerBase
    {
        private readonly ICommandHandler<KeepAliveCommand> handler;

        public KeepAliveController(ICommandHandler<KeepAliveCommand> handler)
        {
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
        }

        [HttpPost]
        public ActionResult Insert([FromBody] KeepAliveCommand command)
        {
            this.handler.Handle(command);

            return Ok();
        }
    }
}