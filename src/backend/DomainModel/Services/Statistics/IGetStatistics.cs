using DomainModel.Classes.Stats;

namespace DomainModel.Services.Statistics
{
    public interface IGetStatistics
    {
        GroupStatistics Get();
    }
}
