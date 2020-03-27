using CQRS.Queries;
using DomainModel.Services.Statistics;
using DomainModel.Services.Users;

namespace DomainModel.CQRS.Queries.GetSheetCounters
{
    public class GetSheetCountersQueryHandler : IQueryHandler<GetSheetCountersQuery, GetSheetCountersQueryResult>
    {
        private readonly IGetAllSheetsStats getAllSheetsStats;
        private readonly IGetSessionContext getSessionContext;


        public GetSheetCountersQueryHandler(IGetAllSheetsStats getAllSheetsStats, IGetSessionContext getSessionContext)
        {
            this.getAllSheetsStats = getAllSheetsStats;
            this.getSessionContext = getSessionContext;
        }

        public GetSheetCountersQueryResult Handle(GetSheetCountersQuery query)
        {
            var sheets = this.getAllSheetsStats.Get(this.getSessionContext.GetActiveGroup());

            return new GetSheetCountersQueryResult()
            {
                Counters = sheets
            };
        }
    }
}
