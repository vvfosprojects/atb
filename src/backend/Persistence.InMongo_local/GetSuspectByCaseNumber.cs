using DomainModel.Classes;
using DomainModel.Classes.Exceptions;
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
            var filter = Builders<Suspect>.Filter.Eq(x => x.Subject.Number, CaseNumber) & Builders<Suspect>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var suspect = this.dbContext.Suspects.Find(filter).SingleOrDefault();

            if (suspect == null)
                throw new AtbNotFoundException("Suspect sheet not found");

            suspect.Subject.Nome = this.cryptools.Decrypt(suspect.Subject.Nome);
            suspect.Subject.Cognome = this.cryptools.Decrypt(suspect.Subject.Cognome);
            suspect.Subject.Email = this.cryptools.Decrypt(suspect.Subject.Email);
            suspect.Subject.Phone = this.cryptools.Decrypt(suspect.Subject.Phone);
            suspect.Subject.Role = this.cryptools.Decrypt(suspect.Subject.Role);

            return suspect;
        }
    }
}