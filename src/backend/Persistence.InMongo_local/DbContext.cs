using DomainModel.Classes;
using DomainModel.CQRS.Commands.KeepAlive;
using DomainModel.CQRS.Queries.GetNews;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("CompositionRoot")]
[assembly: InternalsVisibleTo("DbFeeder")]

namespace Persistence.InMongo_local
{
    public class DbContext
    {
        private readonly IMongoDatabase database;
        private readonly string databaseName;

        public DbContext(string mongoUrl, string databaseName)
        {
            this.database = InitDbInstance(mongoUrl, databaseName);
            this.databaseName = databaseName;
            InitDbSettings();
            MapClasses();
        }

        private IMongoDatabase InitDbInstance(string mongoUrl, string databaseName)
        {
            var url = new MongoUrl(mongoUrl);
            var client = new MongoClient(mongoUrl);
            return client.GetDatabase(databaseName);
        }

        private void InitDbSettings()
        {
            var pack = new ConventionPack();
            pack.Add(new CamelCaseElementNameConvention());
            ConventionRegistry.Register("camel case", pack, t => true);
        }

        private void MapClasses()
        {
            BsonClassMap.RegisterClassMap<Patient>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id)
                    .SetIdGenerator(StringObjectIdGenerator.Instance)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId));
            });

            BsonClassMap.RegisterClassMap<Suspect>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id)
                    .SetIdGenerator(StringObjectIdGenerator.Instance)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId));
            });

            BsonClassMap.RegisterClassMap<User>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id)
                    .SetIdGenerator(StringObjectIdGenerator.Instance)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId));
            });

            BsonClassMap.RegisterClassMap<News>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id)
                    .SetIdGenerator(StringObjectIdGenerator.Instance)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId));
            });

            BsonClassMap.RegisterClassMap<KeepAlive>(cm =>
            {
                cm.AutoMap();
                cm.MapIdMember(c => c.Id)
                    .SetIdGenerator(StringObjectIdGenerator.Instance)
                    .SetSerializer(new StringSerializer(BsonType.ObjectId));
            });
        }

        public IMongoCollection<Patient> Patients
        {
            get
            {
                return database.GetCollection<Patient>("Patients");
            }
        }

        public IMongoCollection<Suspect> Suspects
        {
            get
            {
                return database.GetCollection<Suspect>("Suspects");
            }
        }

        public IMongoCollection<User> Users
        {
            get
            {
                return database.GetCollection<User>("Users");
            }
        }

        public IMongoCollection<News> News
        {
            get
            {
                return database.GetCollection<News>("News");
            }
        }

        public IMongoCollection<KeepAlive> KeepAlives
        {
            get
            {
                return database.GetCollection<KeepAlive>("KeepAlive");
            }
        }
    }
}