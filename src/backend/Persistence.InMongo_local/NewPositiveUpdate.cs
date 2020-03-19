using atb.Helper;
using DomainModel.Classes;
using DomainModel.CQRS.Commands.NewPositiveUpdate;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistence.InMongo_local
{
    public class NewPositiveUpdate : INewPositiveUpdate
    {
        private readonly DbContext dbContext;
        private readonly IGetSessionContext getSessionContext;

        public NewPositiveUpdate(DbContext dbContex, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContex ?? throw new ArgumentNullException(nameof(dbContex));
            this.getSessionContext = getSessionContext;
        }

        public void Add(NewPositiveUpdateCommand command)
        {
            var loggedUser = new GetLoggedUser_fake();

            var dataToInsert = new PositiveData()
            {
                EstremiProvvedimentiASL = command.EstremiProvvedimentiASL,
                ActualWorkReturnDate = command.ActualWorkReturnDate,
                ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
                QuarantinePlace = command.QuarantinePlace,
                ClosedCase = command.ClosedCase,
                UpdatedBy = loggedUser.GetLoggedUser(),
                UpdateTime = DateTime.UtcNow
            };
            
            

            var filter = Builders<Patient>.Filter.Eq(x => x.Data.Number, command.CaseNumber) & Builders<Patient>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var update = Builders<Patient>.Update.Push(p => p.Updates, dataToInsert);
            dbContext.Patients.UpdateOne(filter, update);
        }
    }
}