using CQRS.Queries;
using DomainModel.Services.Statistics;
using System;

namespace DomainModel.CQRS.Queries.GetStatistics
{
    public class GetStatisticsQueryHandler : IQueryHandler<GetStatisticsQuery, GetStatisticsQueryResult>
    {
        private readonly IGetStatistics getStatistics;

        public GetStatisticsQueryHandler(IGetStatistics getStatistics)
        {
            this.getStatistics = getStatistics ?? throw new ArgumentNullException(nameof(getStatistics));
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