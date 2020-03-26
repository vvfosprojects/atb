using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CQRS.Queries;
using DomainModel.CQRS.Queries.GetGroups;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IQueryHandler<GetGroupsQuery, GetGroupsQueryResult> handler;

        public GroupsController(IQueryHandler<GetGroupsQuery, GetGroupsQueryResult> handler)
        {
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
        }

        // GET: api/Groups
        [HttpGet]
        public ActionResult Get([FromQuery] GetGroupsQuery query)
        {
            var groups = this.handler.Handle(query);

            return Ok(
                new
                {
                    groups = groups.Groups.Select(g => new { code = g.Key, description = g.Value })
                }
                );
        }
    }
}