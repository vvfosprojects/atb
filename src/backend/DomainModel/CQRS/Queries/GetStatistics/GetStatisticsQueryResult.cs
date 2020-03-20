using DomainModel.Classes.Stats;

namespace DomainModel.CQRS.Queries.GetStatistics
{
    public class GetStatisticsQueryResult
    {
        public GroupStatistics GroupStatistics { get; set; }
    }
}
