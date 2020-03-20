using DomainModel.Classes.Stats;
using DomainModel.Services;
using DomainModel.Services.Statistics;
using System.Linq;

namespace Persistence.InMongo_local
{
    //public class GetStatistics : IGetStatistics
    //{
    //    private readonly IGetAllSuspectSheets getAllSuspectSheets;
    //    private readonly IGetAllPositiveSheets getAllPositiveSheets;

    //    public GetStatistics(IGetAllSuspectSheets getAllSuspectSheets, IGetAllPositiveSheets getAllPositiveSheets)
    //    {
    //        this.getAllPositiveSheets = getAllPositiveSheets;
    //        this.getAllSuspectSheets = getAllSuspectSheets;
    //    }

    //    public GroupStatistics Get()
    //    {
    //        var positive = this.getAllPositiveSheets.Get().ToList();

    //        int positiveQuarantinePlace = positive

    //        PositiveGroup positiveGroup = new PositiveGroup()
    //        {
    //            TotalSick = positive.Count(),
                
    //        }

    //        var suspect = getAllSuspectSheets.Get();

    //        return new GroupStatistics()
    //        {
    //            Group = positive.,
    //            Positives
                
    //        };

    //    }
    //}
}
