using DomainModel.Classes;
using System;

namespace DomainModel.CQRS.Queries.GetSuspect
{
    public class GetSuspectQueryResult
    {
        public Suspect Suspect { get; set; }
    }
}
