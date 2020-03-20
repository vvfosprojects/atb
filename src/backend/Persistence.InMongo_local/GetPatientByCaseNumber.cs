using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System.Linq;

namespace Persistence.InMongo_local
{
    internal class GetPatientByCaseNumber : IGetPatientByCaseNumber
    {
        private readonly DbContext dbContext;
        private readonly IGetSessionContext getSessionContext;
        private readonly ICryptools cryptools;
        public GetPatientByCaseNumber(DbContext dbContext, IGetSessionContext getSessionContext, ICryptools cryptools)
        {
            this.dbContext = dbContext;
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
        }

        public Patient GetPatient(int CaseNumber)
        {
            var filter = Builders<Patient>.Filter.Eq(x => x.Subject.Number, CaseNumber) & Builders<Patient>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var patient = this.dbContext.Patients.Find(filter).Single();

            patient.Subject.Nome = this.cryptools.Decrypt(patient.Subject.Nome);
            patient.Subject.Cognome = this.cryptools.Decrypt(patient.Subject.Cognome);
            patient.Subject.Email = this.cryptools.Decrypt(patient.Subject.Email);
            patient.Subject.Phone = this.cryptools.Decrypt(patient.Subject.Phone);
            patient.Subject.Role = this.cryptools.Decrypt(patient.Subject.Role);

            return patient;
        }
    }
}
