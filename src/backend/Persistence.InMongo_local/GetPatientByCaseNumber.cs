using DomainModel.Classes;
using DomainModel.Classes.Exceptions;
using DomainModel.Services;
using MongoDB.Driver;
using System;
using System.Linq;

namespace Persistence.InMongo_local
{
    internal class GetPatientByCaseNumber : IGetPatientByCaseNumber
    {
        private readonly DbContext dbContext;

        public GetPatientByCaseNumber(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public Patient GetPatient(int CaseNumber, string group)
        {
            var filter = Builders<Patient>.Filter.Eq(x => x.Subject.Number, CaseNumber) & Builders<Patient>.Filter.Eq(x => x.Group, group);
            var patient = this.dbContext.Patients.Find(filter).SingleOrDefault();

            if (patient == null)
                throw new AtbNotFoundException("Patient sheet not found");
            
            return patient;
        }
    }
}