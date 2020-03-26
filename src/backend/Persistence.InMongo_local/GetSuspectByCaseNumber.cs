using DomainModel.Classes;
using DomainModel.Classes.Exceptions;
using DomainModel.Services;
using MongoDB.Driver;
using System;

namespace Persistence.InMongo_local
{
    internal class GetSuspectByCaseNumber : IGetSuspectByCaseNumber
    {
        private readonly DbContext dbContext;

        public GetSuspectByCaseNumber(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public Suspect GetSuspect(int CaseNumber, string group)
        {
            var filter = Builders<Suspect>.Filter.Eq(x => x.Subject.Number, CaseNumber) & Builders<Suspect>.Filter.Eq(x => x.Group, group);
            var suspect = this.dbContext.Suspects.Find(filter).SingleOrDefault();

            if (suspect == null)
                throw new AtbNotFoundException("Suspect sheet not found");

            return suspect;
        }
    }
}