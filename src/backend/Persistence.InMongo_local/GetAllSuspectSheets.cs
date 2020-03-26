using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Persistence.InMongo_local
{
    class GetAllSuspectSheets : IGetAllSuspectSheets
    {
        private readonly DbContext dbContext;
        private readonly ICryptools cryptools;
        private readonly IGetSessionContext getSessionContext;

        public GetAllSuspectSheets(DbContext dbContext, ICryptools cryptools, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
        }

        public IEnumerable<Suspect> Get()
        {
            var filter = Builders<Suspect>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var collection = this.dbContext.Suspects.Find(filter).ToList();

            foreach (var suspect in collection)
            {
                suspect.Subject.Nome = this.cryptools.Decrypt(suspect.Subject.Nome);
                suspect.Subject.Cognome = this.cryptools.Decrypt(suspect.Subject.Cognome);
                suspect.Subject.Email = this.cryptools.Decrypt(suspect.Subject.Email);
                suspect.Subject.Phone = this.cryptools.Decrypt(suspect.Subject.Phone);
                suspect.Subject.Role = this.cryptools.Decrypt(suspect.Subject.Role);
            }
            return collection;
        }
    }
}
