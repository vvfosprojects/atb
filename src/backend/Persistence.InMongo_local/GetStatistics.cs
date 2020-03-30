using DomainModel.Classes;
using DomainModel.Classes.Stats;
using DomainModel.Services;
using DomainModel.Services.Statistics;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence.InMongo_local
{
    public class GetStatistics : IGetStatistics
    {
        private readonly DbContext dbContext;
        private readonly IGetSessionContext getSessionContext;
        private readonly ICryptools cryptools;

        public GetStatistics(IGetSessionContext getSessionContext, DbContext dbContext, ICryptools cryptools)
        {
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
        }

        public List<GroupStatistics> Get()
        {
            var positives = new List<Patient> ();
            var suspects = new List<Suspect>();

            positives = this.dbContext.Patients.AsQueryable().ToList();
            suspects = this.dbContext.Suspects.AsQueryable().ToList();

            var positivesFilteredList = positives.Select(p => new
            {
                p.Group,
                p.Subject,
                Data = p.Data.Last()
            });

            var suspectsFilteredList = suspects.Select(s => new
            {
                s.Group,
                s.Subject,
                Data = s.Data.Last()
            });

            var allGroup = new HashSet<string> ();
            var result = new List<GroupStatistics>();


            foreach (var group in positivesFilteredList)
            {
                allGroup.Add(group.Group);
            }

            foreach (var group in suspectsFilteredList)
            {
                allGroup.Add(group.Group);
            }


            foreach (var t in allGroup)
            {
                if (positivesFilteredList.Any() && suspectsFilteredList.Any())
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
                        TotalClosed = g.Where(x => x.Data.ExpectedWorkReturnDate != null).Count(),
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
                        TotalClosed = g.Where(x => x.Data.ExpectedWorkReturnDate != null).Count(),
                        RoleFacet = g.GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
                            .OrderBy(g2 => g2.Key)
                            .Select(g2 => new RoleFacet() { Name = g2.Key, Total = g2.Count() }).ToList()
                    }).First(),
                    });
                }
                else if (positivesFilteredList.Any() && !suspectsFilteredList.Any())
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
                                TotalClosed = g.Where(x => x.Data.ExpectedWorkReturnDate != null).Count(),
                                RoleFacet = g.GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
                                    .OrderBy(g2 => g2.Key)
                                    .Select(g2 => new RoleFacet() { Name = g2.Key, Total = g2.Count() }).ToList()
                            }).First(),
                    });
                }
                else
                {
                    result.Add(new GroupStatistics()
                    {
                        Group = t,
                        Suspects = suspectsFilteredList.GroupBy(y => y.Group == t)
                    .Select(g => new SuspectGroup()
                    {
                        QuarantinePlacesFacet = new SuspectQuarantinePlacesFacet()
                        {
                            Home = g.Count(x => x.Data.QuarantinePlace == "HOME"),
                            Hosp = g.Count(x => x.Data.QuarantinePlace == "HOSP"),
                        },
                        TotalSick = g.Count(),
                        TotalClosed = g.Where(x => x.Data.ExpectedWorkReturnDate != null).Count(),
                        RoleFacet = g.GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
                            .OrderBy(g2 => g2.Key)
                            .Select(g2 => new RoleFacet() { Name = g2.Key, Total = g2.Count() }).ToList()
                    }).First(),
                    });
                }
            }
            return result;
        }
    }
}