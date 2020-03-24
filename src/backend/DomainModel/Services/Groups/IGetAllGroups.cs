using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Services.Groups
{
    public interface IGetAllGroups
    {
        IEnumerable<string> Get();
    }
}