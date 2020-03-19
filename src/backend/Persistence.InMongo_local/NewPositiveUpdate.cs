using atb.Helper;
using DomainModel.Classes;
using DomainModel.CQRS.Commands.NewPositiveUpdate;
using DomainModel.Services;
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

        public NewPositiveUpdate(DbContext dbContex)
        {
            this.dbContext = dbContex ?? throw new ArgumentNullException(nameof(dbContex));
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

            var filter = Builders<Patient>.Filter.Eq("number", command.CaseNumber);
            var update = Builders<Patient>.Update.Push(p => p.Updates, dataToInsert);
            dbContext.Patients.UpdateOne(filter, update);

            //var t = dbContext.Patients.Find(builder).ToList();

            //var update = Builders<Patient>.Update.SetOnInsert<PositiveData>("updates", dataToInsert);

            //dbContext.Patients.FindOneAndUpdate(builder, update);

            //dbContext.Patients.FindOneAndUpdate(
            //        Builders<Patient>.Filter.Eq("number", command.CaseNumber),
            //        Builders<Patient>.Update.AddToSet("updates", dataToInsert)
            //        );
        }
    }
}