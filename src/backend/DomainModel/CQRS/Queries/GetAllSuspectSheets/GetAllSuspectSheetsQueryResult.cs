using DomainModel.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.GetAllSuspect
{
    public class GetAllSuspectSheetsQueryResult
    {
        public IEnumerable<Suspect> Suspects { get; set; }
    }
}
