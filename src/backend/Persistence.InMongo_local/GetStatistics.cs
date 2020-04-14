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
            var positives = new List<Patient>();
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

            var allGroup = new HashSet<string>();
            var result = new List<GroupStatistics>();

            foreach (var group in positivesFilteredList)
            {
                allGroup.Add(group.Group);
            }

            foreach (var group in suspectsFilteredList)
            {
                allGroup.Add(group.Group);
            }

            string[] emptyArray = new string[0];

            foreach (var t in allGroup)
            {
                if (positivesFilteredList.Where(y => y.Group == t).Any() && suspectsFilteredList.Where(y => y.Group == t).Any())
                {
                    result.Add(new GroupStatistics()
                    {
                        Group = t,
                        Positives = positivesFilteredList.Where(y => y.Group == t).GroupBy(y => y.Group)
                    .Select(g => new PositiveGroup()
                    {
                        QuarantinePlacesFacet = new PositiveQuarantinePlacesFacet()
                        {
                            Home = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow) && !x.Data.DateOfDeath.HasValue).Count(x => x.Data.QuarantinePlace == "HOME"),
                            Hosp = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow) && !x.Data.DateOfDeath.HasValue).Count(x => x.Data.QuarantinePlace == "HOSP"),
                            IntCare = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow) && !x.Data.DateOfDeath.HasValue).Count(x => x.Data.QuarantinePlace == "INTCARE"),
                        },
                        TotalSick = g.Count(),
                        TotalClosed = g.Where(x => (x.Data.ActualWorkReturnDate.HasValue && x.Data.ActualWorkReturnDate.Value < DateTime.UtcNow) || x.Data.DateOfDeath.HasValue || (x.Data.Link != null && x.Data.Link.Closed == true)).Count(),
                        RoleFacet = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && !x.Data.DateOfDeath.HasValue && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow)).GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
                            .OrderBy(g2 => g2.Key)
                            .Select(g2 => new RoleFacet() { Name = g2.Key, Total = g2.Count() }).ToList()
                    }).First(),
                        Suspects = suspectsFilteredList.Where(y => y.Group == t).GroupBy(y => y.Group)
                    .Select(g => new SuspectGroup()
                    {
                        QuarantinePlacesFacet = new SuspectQuarantinePlacesFacet()
                        {
                            Home = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow)).Count(x => x.Data.QuarantinePlace == "HOME"),
                            Hosp = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow)).Count(x => x.Data.QuarantinePlace == "HOSP"),
                        },
                        TotalSick = g.Count(),
                        TotalClosed = g.Where(x => (x.Data.ActualWorkReturnDate.HasValue && x.Data.ActualWorkReturnDate.Value < DateTime.UtcNow) || (x.Data.Link != null && x.Data.Link.Closed == true)).Count(),
                        RoleFacet = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow)).GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
                            .OrderBy(g2 => g2.Key)
                            .Select(g2 => new RoleFacet() { Name = g2.Key, Total = g2.Count() }).ToList()
                    }).First(),
                    });
                }
                else if (positivesFilteredList.Where(y => y.Group == t).Any() && !suspectsFilteredList.Where(y => y.Group == t).Any())
                {
                    result.Add(new GroupStatistics()
                    {
                        Group = t,
                        Positives = positivesFilteredList.Where(y => y.Group == t).GroupBy(y => y.Group)
                            .Select(g => new PositiveGroup()
                            {
                                QuarantinePlacesFacet = new PositiveQuarantinePlacesFacet()
                                {
                                    Home = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow) && !x.Data.DateOfDeath.HasValue).Count(x => x.Data.QuarantinePlace == "HOME"),
                                    Hosp = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow) && !x.Data.DateOfDeath.HasValue).Count(x => x.Data.QuarantinePlace == "HOSP"),
                                    IntCare = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow) && !x.Data.DateOfDeath.HasValue).Count(x => x.Data.QuarantinePlace == "INTCARE"),
                                },
                                TotalSick = g.Count(),
                                TotalClosed = g.Where(x => (x.Data.ActualWorkReturnDate.HasValue && x.Data.ActualWorkReturnDate.Value < DateTime.UtcNow) || x.Data.DateOfDeath.HasValue || (x.Data.Link != null && x.Data.Link.Closed == true)).Count(),
                                RoleFacet = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && !x.Data.DateOfDeath.HasValue && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow)).GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
                                    .OrderBy(g2 => g2.Key)
                                    .Select(g2 => new RoleFacet() { Name = g2.Key, Total = g2.Count() }).ToList()
                            }).First(),
                        Suspects = new SuspectGroup()
                        {
                            QuarantinePlacesFacet = new SuspectQuarantinePlacesFacet()
                            {
                                Home = 0,
                                Hosp = 0
                            },
                            TotalSick = 0,
                            TotalClosed = 0,
                            RoleFacet = new List<RoleFacet>() { }
                        }
                    });
                }
                else if (!positivesFilteredList.Where(y => y.Group == t).Any() && suspectsFilteredList.Where(y => y.Group == t).Any())
                {
                    result.Add(new GroupStatistics()
                    {
                        Group = t,
                        Positives = new PositiveGroup()
                        {
                            QuarantinePlacesFacet = new PositiveQuarantinePlacesFacet()
                            {
                                Home = 0,
                                Hosp = 0,
                                IntCare = 0
                            },
                            TotalSick = 0,
                            TotalClosed = 0,
                            RoleFacet = new List<RoleFacet>() { }
                        },
                        Suspects = suspectsFilteredList.Where(y => y.Group == t).GroupBy(y => y.Group)
                    .Select(g => new SuspectGroup()
                    {
                        QuarantinePlacesFacet = new SuspectQuarantinePlacesFacet()
                        {
                            Home = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow)).Count(x => x.Data.QuarantinePlace == "HOME"),
                            Hosp = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow)).Count(x => x.Data.QuarantinePlace == "HOSP"),
                        },
                        TotalSick = g.Count(),
                        TotalClosed = g.Where(x => (x.Data.ActualWorkReturnDate.HasValue && x.Data.ActualWorkReturnDate.Value < DateTime.UtcNow) || (x.Data.Link != null && x.Data.Link.Closed == true)).Count(),
                        RoleFacet = g.Where(x => (x.Data.Link == null || x.Data.Link.Closed == false) && (!x.Data.ActualWorkReturnDate.HasValue || x.Data.ActualWorkReturnDate.Value >= DateTime.UtcNow)).GroupBy(g2 => this.cryptools.Decrypt(g2.Subject.Role))
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
                        Positives = new PositiveGroup()
                        {
                            QuarantinePlacesFacet = new PositiveQuarantinePlacesFacet()
                            {
                                Home = 0,
                                Hosp = 0,
                                IntCare = 0
                            },
                            TotalSick = 0,
                            TotalClosed = 0,
                            RoleFacet = new List<RoleFacet>() { }
                        },
                        Suspects = new SuspectGroup()
                        {
                            QuarantinePlacesFacet = new SuspectQuarantinePlacesFacet()
                            {
                                Home = 0,
                                Hosp = 0
                            },
                            TotalSick = 0,
                            TotalClosed = 0,
                            RoleFacet = new List<RoleFacet>() { }
                        }
                    });
                }
            }
            return result;
        }
    }
}