using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CQRS.Queries;
using DomainModel.CQRS.Queries.Auth;
using DomainModel.Services;
using DomainModel.Services.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace atb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IQueryHandler<AuthQuery, AuthQueryResult> handler;
        private readonly IJwtEncoder jwtEncoder;

        public AuthController(IQueryHandler<AuthQuery, AuthQueryResult> handler,
            IJwtEncoder jwtEncoder)
        {
            this.handler = handler ?? throw new ArgumentNullException(nameof(handler));
            this.jwtEncoder = jwtEncoder ?? throw new ArgumentNullException(nameof(jwtEncoder));
        }

        public ActionResult Get(AuthQuery query)
        {
            var authResult = this.handler.Handle(query);
            string jwt;

            if (authResult.Success)
            {
                var roles = authResult.Roles;
                jwt = this.jwtEncoder.Encode(query.Username, authResult.Group, roles);
            }
            else
                jwt = string.Empty;

            var result = new
            {
                success = authResult.Success,
                errorMsg = authResult.Success ? string.Empty : "Authentication failed.",
                jwt,
                username = authResult.Username,
                roles = authResult.Roles,
                group = authResult.Group,
            };

            return Ok(result);
        }
    }
}