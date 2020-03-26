using DomainModel.Classes;
using DomainModel.Services;
using MongoDB.Driver;
using System;
using System.Linq;

namespace Persistence.InMongo_local
{
    public class GetNextPositiveCaseNumber : IGetNextPositiveCaseNumber
    {
        private readonly DbContext dbContext;
        public GetNextPositiveCaseNumber(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public int Get(string group)
        {
            var filter = Builders<Patient>.Filter.Eq(x => x.Group, group);
            var patientsList = dbContext.Patients.Find(filter).ToList();
            
            //se la lista è priva di pazienti allora restituisco 0
            if (patientsList.Count == 0)
            {
                return 0;
            }
            
            var patientWithMaxCaseNumber = patientsList.OrderByDescending(x => x.Subject.Number).First();
            return patientWithMaxCaseNumber.Subject.Number;
        }
    }
}
