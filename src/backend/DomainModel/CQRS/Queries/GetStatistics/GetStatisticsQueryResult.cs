using DomainModel.Classes.Stats;
using System.Collections.Generic;

namespace DomainModel.CQRS.Queries.GetStatistics
{
    public class GetStatisticsQueryResult
    {
        public IList<GroupStatistics> GroupStatistics { get; set; }
    }
}
