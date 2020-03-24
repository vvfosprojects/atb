using atb.Helper;
using DomainModel.Classes;
using DomainModel.CQRS.Commands.NewSuspectUpdate;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;

namespace Persistence.InMongo_local
{
    public class NewSuspectUpdate : INewSuspectUpdate
    {
        private readonly DbContext dbContext;
        private readonly IGetSessionContext getSessionContext;

        public NewSuspectUpdate(DbContext dbContex, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContex ?? throw new ArgumentNullException(nameof(dbContex));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public void Add(NewSuspectUpdateCommand command)
        {
            var loggedUser = this.getSessionContext.GetLoggedUsername();

            var dataToInsert = new SuspectData()
            {
                ActualWorkReturnDate = command.ActualWorkReturnDate,
                ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
                QuarantinePlace = command.QuarantinePlace,
                HealthMeasure = new HealthMeasure()
                {
                    By = command.HealthMeasure.By,
                    Code = command.HealthMeasure.Code
                },
                UpdatedBy = loggedUser,
                UpdateTime = DateTime.UtcNow
            };

            var filter = Builders<Suspect>.Filter.Eq(x => x.Subject.Number, command.CaseNumber) & Builders<Suspect>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var update = Builders<Suspect>.Update.Push(p => p.Data, dataToInsert);
            dbContext.Suspects.UpdateOne(filter, update);
        }
    }
}