using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CQRS.Commands;
using DomainModel.CQRS.Commands.NewSuspectUpdate;
using Microsoft.AspNetCore.Http;
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
            return Ok();
        }
    }
}
