using DomainModel.Classes;
using DomainModel.CQRS.Commands.UpdatePositive;
using DomainModel.Services;
using MongoDB.Driver;
using System;

namespace Persistence.InMongo_local
{
    public class UpdatePositive : IUpdatePositive
    {
        private readonly DbContext dbContext;

        public UpdatePositive(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public void Update(UpdatePositiveCommand command, string group)
        {
            var filter = Builders<Patient>.Filter.Eq(x => x.Group, group) & Builders<Patient>.Filter.Eq(x => x.Subject.Number, command.CaseNumber);
            var update = Builders<Patient>.Update.Set(x => x.Subject.Nome, command.Nome).Set(x => x.Subject.Cognome, command.Cognome).Set(x => x.Subject.Email, command.Email).Set(x => x.Subject.Phone, command.Phone).Set(x => x.Subject.Role, command.Role);
            this.dbContext.Patients.UpdateOne(filter, update);
        }
    }
}
