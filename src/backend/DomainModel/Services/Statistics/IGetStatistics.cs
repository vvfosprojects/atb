using DomainModel.Classes.Stats;
using System.Collections.Generic;

namespace DomainModel.Services.Statistics
{
    public interface IGetStatistics
    {
        List<GroupStatistics> Get();
    }
}
