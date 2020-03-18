using CQRS.Queries;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.Auth
{
    public class AuthQuery : IQuery<AuthQueryResult>
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}