using DomainModel.Classes;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;
using System.Linq;

namespace Persistence.InMongo_local
{
    public class GetNextPositiveCaseNumber : IGetNextPositiveCaseNumber
    {
        private readonly DbContext dbContext ;
        private readonly IGetSessionContext getSessionContext;
        public GetNextPositiveCaseNumber(DbContext dbContext, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public int Get()
        {
            var filter = Builders<Patient>.Filter.Eq(x => x.Group, getSessionContext.GetActiveGroup());
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
