using DomainModel.CQRS.Queries.GetSheetCounters;

namespace DomainModel.Services.Statistics
{
    public interface IGetAllSheetsStats
    {
        Counters Get(string group);
    }
}
