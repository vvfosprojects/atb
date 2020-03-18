using CQRS.Commands;
using CQRS.Queries;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.Auth
{
    public class AuthQueryHandler : IQueryHandler<AuthQuery, AuthQueryResult>
    {
        public AuthQueryResult Handle(AuthQuery query)
        {
            return new AuthQueryResult()
            {
                Success = true,
                Username = "mario.rossi",
                Group = "Catania",
                IsDoctor = true,
            };
        }
    }
}