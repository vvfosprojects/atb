﻿using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Persistence.InMongo_local
{
    internal class GetAllPositiveSheets : IGetAllPositiveSheets
    {
        private readonly DbContext dbContext;
        private readonly ICryptools cryptools;
        private readonly IGetSessionContext getSessionContext;

        public GetAllPositiveSheets(DbContext dbContext, ICryptools cryptools, IGetSessionContext getSessionContext)
        {
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public IEnumerable<Patient> Get()
        {
            var filter = Builders<Patient>.Filter.In("Group", getSessionContext.GetActiveGroup());
            var collection = this.dbContext.Patients.Find(filter).ToList();

            foreach(var patient in collection)
            {
                patient.Subject.Nome = this.cryptools.Decrypt(patient.Subject.Nome);
                patient.Subject.Cognome = this.cryptools.Decrypt(patient.Subject.Cognome);
                patient.Subject.Email = this.cryptools.Decrypt(patient.Subject.Email);
                patient.Subject.Phone = this.cryptools.Decrypt(patient.Subject.Phone);
                patient.Subject.Role = this.cryptools.Decrypt(patient.Subject.Role);
            }

            return collection;
        }
    }
}
