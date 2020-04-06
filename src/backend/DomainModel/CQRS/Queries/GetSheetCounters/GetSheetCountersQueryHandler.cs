using CQRS.Queries;
using DomainModel.Services.Statistics;
using DomainModel.Services.Users;
using System;

namespace DomainModel.CQRS.Queries.GetSheetCounters
{
    public class GetSheetCountersQueryHandler : IQueryHandler<GetSheetCountersQuery, GetSheetCountersQueryResult>
    {
        private readonly IGetAllSheetsStats getAllSheetsStats;
        private readonly IGetSessionContext getSessionContext;


        public GetSheetCountersQueryHandler(IGetAllSheetsStats getAllSheetsStats, IGetSessionContext getSessionContext)
        {
            this.getAllSheetsStats = getAllSheetsStats ?? throw new ArgumentNullException(nameof(getAllSheetsStats));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public GetSheetCountersQueryResult Handle(GetSheetCountersQuery query)
        {
            var sheets = this.getAllSheetsStats.Get(query.Group);

            return new GetSheetCountersQueryResult()
            {
                Counters = sheets
            };
        }
    }
}
