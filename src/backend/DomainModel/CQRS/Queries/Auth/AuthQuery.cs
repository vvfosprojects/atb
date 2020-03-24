using CQRS.Logging;
using CQRS.Queries;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.Auth
{
    public class AuthQuery : IQuery<AuthQueryResult>, IHasCustomAudit
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public string SerializeForAudit()
        {
            return this.ToString();
        }

        public override string ToString()
        {
            return $"{{ Username: \"{ this.Username }\", Password: \"***\" }}";
        }
    }
}