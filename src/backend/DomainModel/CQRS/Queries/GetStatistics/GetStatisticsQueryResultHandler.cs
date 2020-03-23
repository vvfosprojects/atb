using CQRS.Queries;
using DomainModel.Services.Statistics;

namespace DomainModel.CQRS.Queries.GetStatistics
{
    public class GetStatisticsQueryResultHandler : IQueryHandler<GetStatisticsQuery, GetStatisticsQueryResult>
    {
        private readonly IGetStatistics getStatistics;

        public GetStatisticsQueryResultHandler(IGetStatistics getStatistics)
        {
            this.getStatistics = getStatistics;
        }

        public GetStatisticsQueryResult Handle(GetStatisticsQuery query)
        {
            return new GetStatisticsQueryResult()
            {
                GroupStatistics = this.getStatistics.Get()
            };
        }
    }
}