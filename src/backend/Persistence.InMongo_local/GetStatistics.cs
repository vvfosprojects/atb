using DomainModel.Classes;
using DomainModel.Classes.Stats;
using DomainModel.Services;
using DomainModel.Services.Statistics;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Persistence.InMongo_local
{
    public class GetStatistics : IGetStatistics
    {
        private readonly IGetAllSuspectSheets getAllSuspectSheets;
        private readonly IGetAllPositiveSheets getAllPositiveSheets;
        private readonly DbContext dbContext;
        private readonly IGetSessionContext getSessionContext;
        private readonly ICryptools cryptools;

        public GetStatistics(IGetAllSuspectSheets getAllSuspectSheets, IGetAllPositiveSheets getAllPositiveSheets, IGetSessionContext getSessionContext, DbContext dbContext, ICryptools cryptools)
        {
            this.getAllPositiveSheets = getAllPositiveSheets;
            this.getAllSuspectSheets = getAllSuspectSheets;
            this.getSessionContext = getSessionContext;
            this.dbContext = dbContext;
            this.cryptools = cryptools;
        }

        public List<GroupStatistics> Get()
        {
            var positives = new List<Patient> ();
            var suspects = new List<Suspect>();

            if (! string.IsNullOrWhiteSpace(this.getSessionContext.GetActiveGroup()))
            {
                var filterPatient = Builders<Patient>.Filter.Eq(x => x.Group, this.getSessionContext.GetActiveGroup());
                var filterSuspect = Builders<Suspect>.Filter.Eq(x => x.Group, this.getSessionContext.GetActiveGroup());
                positives = dbContext.Patients.Find(filterPatient).ToList();
                suspects = dbContext.Suspects.Find(filterSuspect).ToList();
            }
            else
            {
                positives = this.getAllPositiveSheets.Get().ToList();
                suspects = this.getAllSuspectSheets.Get().ToList();
            }

            var positivesFilteredList = positives.Select(p => new
            {
                Group = p.Group,
                Subject = p.Subject,
                Data = p.Data.Last()
            });

            var suspectsFilteredList = suspects.Select(s => new
            {
                Group = s.Group,
                Subject = s.Subject,
                Data = s.Data.Last()
            });

            var allGroup = new HashSet<string> ();
            var result = new List<GroupStatistics>();


            foreach (var group in positivesFilteredList)
            {
                allGroup.Add(group.Group);
            }

            foreach(var t in allGroup)
            {
                result.Add(new GroupStatistics() 
                {
                    Group = t,
                    Positives = positivesFilteredList.GroupBy(y => y.Group == t)
                    .Select(g => new PositiveGroup()
                    {
                        QuarantinePlacesFacet = new PositiveQuarantinePlacesFacet()
                        {
                            Home = g.Count(x => x.Data.QuarantinePlace == "HOME"),
                            Hosp = g.Count(x => x.Data.QuarantinePlace == "HOSP"),
                            IntCare = g.Count(x => x.Data.QuarantinePlace == "INTCARE"),
                        },
                        TotalSick = g.Count(),
                        TotalClosed = g.Where(x => x.Data.ClosedCase == true).Count(),
                        RoleFacet = g.GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
                            .OrderBy(g2 => g2.Key)
                            .Select(g2 => new RoleFacet() { Name = g2.Key, Total = g2.Count() }).ToList()
                    }).First(),
                    Suspects = suspectsFilteredList.GroupBy(y => y.Group == t)
                    .Select(g => new SuspectGroup()
                    {
                        QuarantinePlacesFacet = new SuspectQuarantinePlacesFacet()
                        {
                            Home = g.Count(x => x.Data.QuarantinePlace == "HOME"),
                            Hosp = g.Count(x => x.Data.QuarantinePlace == "HOSP"),
                        },
                        TotalSick = g.Count(),
                        TotalClosed = g.Where(x => x.Data.ClosedCase == true).Count(),
                        RoleFacet = g.GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
                            .OrderBy(g2 => g2.Key)
                            .Select(g2 => new RoleFacet() { Name = g2.Key, Total = g2.Count() }).ToList()
                    }).First(),
                });
            }
            return result;
        }
    }
}