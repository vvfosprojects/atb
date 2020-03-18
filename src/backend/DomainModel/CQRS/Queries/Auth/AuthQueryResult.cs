using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.Auth
{
    public class AuthQueryResult
    {
        public bool Success { get; set; }
        public string Username { get; set; }
        public string Group { get; set; }
        public bool IsDoctor { get; set; }
    }
}