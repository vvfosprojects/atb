using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;

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
            var filter = Builders<Patient>.Filter.Eq(x => x.Data.Number, CaseNumber) & Builders<Patient>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
            var patient = this.dbContext.Patients.Find(filter).Single();

            patient.Data.Nome = this.cryptools.Decrypt(patient.Data.Nome);
            patient.Data.Cognome = this.cryptools.Decrypt(patient.Data.Cognome);
            patient.Data.Email = this.cryptools.Decrypt(patient.Data.Email);
            patient.Data.Phone = this.cryptools.Decrypt(patient.Data.Phone);
            patient.Data.Role = this.cryptools.Decrypt(patient.Data.Role);

            return patient;
        }
    }
}
