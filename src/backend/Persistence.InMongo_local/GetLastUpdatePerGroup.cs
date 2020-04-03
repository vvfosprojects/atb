using DomainModel.CQRS.Commands.KeepAlive;
using DomainModel.CQRS.Queries.GetLastUpdatePerGroup;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Persistence.InMongo_local
{
    internal class GetLastUpdatePerGroup : IGetLastUpdatePerGroup
    {
        private readonly DbContext dbContext;
        public GetLastUpdatePerGroup(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public string GenerateCSV(GetLastUpdatePerGroupQuery query)
        {
            var pipeline = new List<BsonDocument>()
            {
                new BsonDocument { { "$unwind", "$data" } },
                new BsonDocument { { "$group",
                    new BsonDocument { { "_id", "$_id" }, { "group", new BsonDocument { { "$last", "$group" } } }, { "lastSheetUpdateTime", new BsonDocument { { "$last", "$data.updateTime" } } } }
                } },
                new BsonDocument { { "$group", new BsonDocument { {"_id", "$group" } , {"lastGroupUpdateTime", new BsonDocument { { "$max", "$lastSheetUpdateTime" } } } } } } 
            };

            var pipeline_keepAlive = new List<BsonDocument>()
            {
                new BsonDocument {{ "$group", 
                        new BsonDocument {{"_id", "$group"}, { "data", new BsonDocument { { "$max", "$data" } } } }
                    }}
            };


            var patients = dbContext.Patients.Aggregate<BsonDocument>(pipeline).ToList();
            var suspects = dbContext.Suspects.Aggregate<BsonDocument>(pipeline).ToList();
            var keepAlives = dbContext.KeepAlives.Aggregate<BsonDocument>(pipeline_keepAlive).ToList();

            var dictionaryGroupLastUpdate = new Dictionary<string, DateTime>();

            for (int i = 0; i < patients.Count; i++)
            {
                dictionaryGroupLastUpdate.Add(patients[i][0].ToString(), (DateTime)patients[i][1]);
            }

            if(suspects.Any())
            {
                for (int i = 0; i < suspects.Count; i++)
                {
                    if (dictionaryGroupLastUpdate.ContainsKey(suspects[i][0].ToString()))
                    {
                        var actualMaxdate = dictionaryGroupLastUpdate[suspects[i][0].ToString()];
                        if ((DateTime)suspects[i][1] > actualMaxdate)
                        {
                            dictionaryGroupLastUpdate[suspects[i][0].ToString()] = (DateTime)suspects[i][1];
                        }
                    }
                    else
                    {
                        dictionaryGroupLastUpdate.Add(suspects[i][0].ToString(), (DateTime)suspects[i][1]);
                    }
                }
            }

            if (keepAlives.Any())
            {
                for (int i = 0; i < keepAlives.Count; i++)
                {
                    if (dictionaryGroupLastUpdate.ContainsKey(keepAlives[i][0].ToString()))
                    {
                        var actualMaxdate = dictionaryGroupLastUpdate[keepAlives[i][0].ToString()];
                        if ((DateTime)keepAlives[i][1] > actualMaxdate)
                        {
                            dictionaryGroupLastUpdate[keepAlives[i][0].ToString()] = (DateTime)keepAlives[i][1];
                        }
                    }
                    else
                    {
                        dictionaryGroupLastUpdate.Add(keepAlives[i][0].ToString(), (DateTime)keepAlives[i][1]);
                    }
                }
            }


            StringBuilder sw = new StringBuilder();
            sw.AppendFormat("Gruppo|Date");
            sw.AppendLine();

            foreach (var d in dictionaryGroupLastUpdate)
            {
                var str = string.Format("{0}|{1}",
                    d.Key,
                    d.Value.ToString()
                     );
                sw.AppendLine(str);
            }

            return sw.ToString();
        }
    }
}
