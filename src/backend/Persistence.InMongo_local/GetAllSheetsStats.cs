using DomainModel.CQRS.Queries.GetSheetCounters;
using DomainModel.Services.Statistics;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace Persistence.InMongo_local
{
    public class GetAllSheetsStats : IGetAllSheetsStats
    {
        private readonly DbContext dbContext;

        public GetAllSheetsStats(DbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Counters Get(string group)
        {
            var pipeline = new List<BsonDocument>()
            {
                new BsonDocument { { "$unwind", "$data" } },
                new BsonDocument { { "$group",
                    new BsonDocument { { "_id", "$_id" }, { "lastDate", new BsonDocument { { "$last", "$data.actualWorkReturnDate" } } } }
                } },
                new BsonDocument { { "$project",
                    new BsonDocument { { "closed",
                        new BsonDocument { { "$lt",
                            new BsonArray { "$lastDate", "Date()" }
                        } }
                    } }
                } },
                new BsonDocument { { "$group", new BsonDocument { { "_id", "$closed" }, { "count", new BsonDocument { { "$sum", 1 } } } } } }
            };

            if (!string.IsNullOrWhiteSpace(group))
                pipeline.Insert(0, new BsonDocument { { "$match", new BsonDocument { { "group", group } } } });

            var resultPatients = dbContext.Patients.Aggregate<BsonDocument>(pipeline)
                .ToList();

            var resultSuspects = dbContext.Suspects.Aggregate<BsonDocument>(pipeline)
                .ToList();


            return new Counters()
            {
                Positives = new Counters.PositiveCounter()
                {
                    Closed = (int)resultPatients[0][1],
                    Open = (int)resultPatients[1][1]
                },
                Suspects = new Counters.SuspectCounter()
                {
                    Closed = (int)resultSuspects[0][1],
                    Open = (int)resultSuspects[1][1]
                }
            };
        }
    }
}
