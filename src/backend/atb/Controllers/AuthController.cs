using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CQRS.Queries;
using DomainModel.CQRS.Queries.Auth;
using DomainModel.Services;
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

            if (authResult.Success)
            {
                var roles = authResult.IsDoctor ? new[] { "doctor " } : new string[0];
                var jwt = this.jwtEncoder.Encode(query.Username, authResult.Group, roles);
                return Ok(new
                {
                    result = "success",
                    errorMsg = string.Empty,
                    jwt,
                    username = query.Username,
                    roles,
                    group = authResult.Group
                });
            }

            return Ok(new
            {
                result = "failure",
                errorMsg = "Authentication failed.",
                username = query.Username,
                jwt = string.Empty,
                roles = new string[0],
                group = string.Empty
            });
        }
    }
}