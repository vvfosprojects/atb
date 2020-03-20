using DomainModel.Classes;
using System.Collections.Generic;

namespace DomainModel.Services
{
    public interface IGetAllSuspectSheets
    {
        IEnumerable<Suspect> Get();
    }
}
