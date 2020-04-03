using DomainModel.CQRS.Queries.GetSheetCounters;
using DomainModel.Services.Statistics;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence.InMongo_local
{
    public class GetAllSheetsStats_Linq : IGetAllSheetsStats
    {
        private readonly DbContext dbContext;
        private readonly GetAllSheetsByGroup getAllSheetsByGroup;

        public GetAllSheetsStats_Linq(DbContext dbContext,
            GetAllSheetsByGroup getAllSheetsByGroup)
        {
            this.dbContext = dbContext;
            this.getAllSheetsByGroup = getAllSheetsByGroup ?? throw new ArgumentNullException(nameof(getAllSheetsByGroup));
        }

        public Counters Get(string group)
        {
            var allSheets = this.getAllSheetsByGroup.Get(group);

            var patientsOpenClosedGroup = allSheets.Patients.GroupBy(s => s.Closed).ToDictionary(k => k.Key, v => v.Count());
            var suspectOpenClosedGroup = allSheets.Suspects.GroupBy(s => s.Closed).ToDictionary(k => k.Key, v => v.Count());

            return new Counters
            {
                Positives = new Counters.PositiveCounter
                {
                    Open = patientsOpenClosedGroup.ContainsKey(false) ? patientsOpenClosedGroup[false] : 0,
                    Closed = patientsOpenClosedGroup.ContainsKey(true) ? patientsOpenClosedGroup[true] : 0,
                },
                Suspects = new Counters.SuspectCounter
                {
                    Open = suspectOpenClosedGroup.ContainsKey(false) ? suspectOpenClosedGroup[false] : 0,
                    Closed = suspectOpenClosedGroup.ContainsKey(true) ? suspectOpenClosedGroup[true] : 0,
                }
            };
        }
    }
}