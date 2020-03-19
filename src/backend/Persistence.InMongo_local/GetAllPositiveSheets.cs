using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistence.InMongo_local
{
    internal class GetAllPositiveSheets : IGetAllPositiveSheets
    {
        private readonly DbContext dbContext;
        private readonly ICryptools cryptools;
        private readonly IGetSessionContext getSessionContext;

        public GetAllPositiveSheets(DbContext dbContext, ICryptools cryptools, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContext;
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
        }

        public IEnumerable<Patient> Get()
        {
            var filter = Builders<Patient>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var collection = this.dbContext.Patients.Find(filter).ToList();

            foreach(var patient in collection)
            {
                patient.Data.Nome = this.cryptools.Decrypt(patient.Data.Nome);
                patient.Data.Cognome = this.cryptools.Decrypt(patient.Data.Cognome);
                patient.Data.Email = this.cryptools.Decrypt(patient.Data.Email);
                patient.Data.Phone = this.cryptools.Decrypt(patient.Data.Phone);
                patient.Data.Role = this.cryptools.Decrypt(patient.Data.Role);
            }
            return collection;
        }
    }
}
