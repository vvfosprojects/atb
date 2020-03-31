using DomainModel.Classes;
using DomainModel.CQRS.Commands.UpdateSuspect;
using DomainModel.Services;
using MongoDB.Driver;
using System;

namespace Persistence.InMongo_local
{
    public class UpdateSuspect : IUpdateSuspect
    {
        private readonly DbContext dbContext;

        public UpdateSuspect(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public void Update(UpdateSuspectCommand command, string group)
        {
            var filter = Builders<Suspect>.Filter.Eq(x => x.Group, group) & Builders<Suspect>.Filter.Eq(x => x.Subject.Number, command.Number);
            var update = Builders<Suspect>.Update.Set(x => x.Subject.Nome, command.Name).Set(x => x.Subject.Cognome, command.Surname).Set(x => x.Subject.Email, command.Email).Set(x => x.Subject.Phone, command.Phone).Set(x => x.Subject.Role, command.Role);
            this.dbContext.Suspects.UpdateOne(filter, update);
        }
    }
}
