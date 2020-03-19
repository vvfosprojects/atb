using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DomainModel.Services.Users;
using Microsoft.AspNetCore.Mvc;

namespace RockApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckSessionDataController : ControllerBase
    {
        private readonly IGetSessionContext getLoggedUserContext;

        public CheckSessionDataController(IGetSessionContext getLoggedUserContext)
        {
            this.getLoggedUserContext = getLoggedUserContext ?? throw new ArgumentNullException(nameof(getLoggedUserContext));
        }

        // GET api/values
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(new
            {
                username = this.getLoggedUserContext.GetLoggedUsername(),
                activeGroup = this.getLoggedUserContext.GetActiveGroup()
            });
        }
    }
}