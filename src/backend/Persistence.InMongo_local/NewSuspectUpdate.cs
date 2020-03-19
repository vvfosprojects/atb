﻿using atb.Helper;
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
            this.getSessionContext = getSessionContext;
        }

        public void Add(NewSuspectUpdateCommand command)
        {
            var loggedUser = new GetLoggedUser_fake();

            var dataToInsert = new SuspectData()
            {
                ActualWorkReturnDate = command.ActualWorkReturnDate,
                ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
                QuarantinePlace = command.QuarantinePlace,
                ClosedCase = command.ClosedCase,
                UpdatedBy = loggedUser.GetLoggedUser(),
                UpdateTime = DateTime.UtcNow
            };

            var filter = Builders<Suspect>.Filter.Eq(x => x.Data.Number, command.CaseNumber) & Builders<Suspect>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var update = Builders<Suspect>.Update.Push(p => p.Updates, dataToInsert);
            dbContext.Suspects.UpdateOne(filter, update);
        }
    }
}
