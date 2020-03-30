using DomainModel.CQRS.Queries.GetSheetCounters;
using DomainModel.Services.Statistics;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
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
            var dateTime = DateTime.Parse("2100-12-31");
            var pipeline = new List<BsonDocument>()
            {
                new BsonDocument { { "$unwind", "$data" } },
                new BsonDocument { { "$group",
                    new BsonDocument { { "_id", "$_id" }, { "lastData", new BsonDocument { { "$last", "$data.actualWorkReturnDate" } } } }
                } },
                new BsonDocument {{ "$project",
                    new BsonDocument {{"nonNullData", 
                            new BsonDocument { {"$ifNull", new BsonArray {"$lastData", new BsonDateTime(dateTime) } } } 
                        }}
                    }},
                new BsonDocument { { "$project",
                    new BsonDocument { { "closed",
                        new BsonDocument { { "$lt",
                            new BsonArray { "$nonNullData", new BsonDocument{ { "$add", new BsonArray { DateTime.UtcNow, 13*60*60000 } } } }
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

            var dictPos = new Dictionary<string, int>();
            var dictSusp = new Dictionary<string, int>();

            for (int i = 0; i < resultPatients.Count; i++)
            {
                dictPos.Add(resultPatients[i][0].ToString(), (int)resultPatients[i][1]);
            }

            for (int j = 0; j < resultSuspects.Count; j++)
            {
                dictSusp.Add(resultSuspects[j][0].ToString(), (int)resultSuspects[j][1]);
            }

            //if (resultPatients.Count > 0)
            //{
            //    dictPos.Add(resultPatients[0][0].ToString(),(int)resultPatients[0][1]);
            //    dictPos.Add(resultPatients[1][0].ToString(), (int)resultPatients[1][1]);
            //}


            //if (resultSuspects.Count > 0)
            //{
            //    dictSusp.Add(resultSuspects[0][0].ToString(), (int)resultSuspects[0][1]);
            //    dictSusp.Add(resultSuspects[1][0].ToString(), (int)resultSuspects[1][1]);
            //}

            int positivesClosed = 0;
            int positivesOpen = 0;
            int suspectsClosed = 0;
            int suspectsOpen = 0;

            if (resultPatients.Count > 0)
            {
                positivesClosed = dictPos.GetValueOrDefault("true");
                positivesOpen = dictPos.GetValueOrDefault("false");
            }

            if (resultSuspects.Count > 0)
            {
                suspectsClosed = dictSusp.GetValueOrDefault("true");
                suspectsOpen = dictSusp.GetValueOrDefault("false");
            }

            return new Counters()
            {
                Positives = new Counters.PositiveCounter()
                {
                    Closed = positivesClosed,
                    Open = positivesOpen
                },
                Suspects = new Counters.SuspectCounter()
                {
                    Closed = suspectsClosed,
                    Open = suspectsOpen
                }
            };
        }
    }
}