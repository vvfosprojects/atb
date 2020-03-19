using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;

namespace Persistence.InMongo_local
{
    internal class GetSuspectByCaseNumber : IGetSuspectByCaseNumber
    {
        private readonly DbContext dbContext;
        private readonly IGetSessionContext getSessionContext;
        private readonly ICryptools cryptools;
        public GetSuspectByCaseNumber(DbContext dbContext, IGetSessionContext getSessionContext, ICryptools cryptools)
        {
            this.dbContext = dbContext;
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
        }

        public Suspect GetSuspect(int CaseNumber)
        {
            var filter = Builders<Suspect>.Filter.Eq(x => x.Data.Number, CaseNumber) & Builders<Suspect>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var suspect = this.dbContext.Suspects.Find(filter).Single();

            suspect.Data.Nome = this.cryptools.Decrypt(suspect.Data.Nome);
            suspect.Data.Cognome = this.cryptools.Decrypt(suspect.Data.Cognome);
            suspect.Data.Email = this.cryptools.Decrypt(suspect.Data.Email);
            suspect.Data.Phone = this.cryptools.Decrypt(suspect.Data.Phone);
            suspect.Data.Role = this.cryptools.Decrypt(suspect.Data.Role);

            return suspect;
        }
    }
}
