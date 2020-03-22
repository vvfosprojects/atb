using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CQRS.Commands;
using DomainModel.CQRS.Commands.ChangePassword;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChangePasswordController : ControllerBase
    {
        private readonly ICommandHandler<ChangePasswordCommand> handler;

        public ChangePasswordController(ICommandHandler<ChangePasswordCommand> handler)
        {
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
        }

        // POST: api/ChangePassword
        [HttpPost]
        public void Post([FromBody] ChangePasswordCommand command)
        {
            this.handler.Handle(command);
        }
    }
}