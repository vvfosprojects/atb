using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Services
{
    public interface IJwtEncoder
    {
        string Encode(string username, string group, string[] roles);
    }
}