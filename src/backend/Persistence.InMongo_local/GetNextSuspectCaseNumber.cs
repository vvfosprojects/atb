﻿using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;
using System.Linq;

namespace Persistence.InMongo_local
{
    internal class GetNextSuspectCaseNumber : IGetNextSuspectCaseNumber
    {
        private readonly DbContext dbContext;
        private readonly IGetSessionContext getSessionContext;

        public GetNextSuspectCaseNumber(DbContext dbContext, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public int Get()
        {
            var filter = Builders<Suspect>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var suspectsList = dbContext.Suspects.Find(filter).ToList();
            //se la lista è priva di pazienti allora restituisco 0
            if (suspectsList.Count == 0)
            {
                return 0;
            }
            var suspectWithMaxCaseNumber = suspectsList.OrderByDescending(x => x.Subject.Number).First();
            return suspectWithMaxCaseNumber.Subject.Number;
        }
    }
}
