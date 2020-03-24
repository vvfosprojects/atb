using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetGroups
{
    public class GetGroupsQueryResult
    {
        public IDictionary<string, string> Groups { get; set; }
    }
}