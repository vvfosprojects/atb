using DomainModel.Classes;
using System.Collections.Generic;

namespace DomainModel.Services
{
    public interface IGetAllPositiveSheets
    {
        IEnumerable<Patient> Get();
    }
}
