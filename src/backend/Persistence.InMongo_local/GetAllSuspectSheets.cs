using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
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
            this.dbContext = dbContext;
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
        }

        public IEnumerable<Suspect> Get()
        {
            var filter = Builders<Suspect>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var collection = this.dbContext.Suspects.Find(filter).ToList();

            foreach (var suspect in collection)
            {
                suspect.Data.Nome = this.cryptools.Decrypt(suspect.Data.Nome);
                suspect.Data.Cognome = this.cryptools.Decrypt(suspect.Data.Cognome);
                suspect.Data.Email = this.cryptools.Decrypt(suspect.Data.Email);
                suspect.Data.Phone = this.cryptools.Decrypt(suspect.Data.Phone);
                suspect.Data.Role = this.cryptools.Decrypt(suspect.Data.Role);
            }
            return collection;
        }
    }






}
