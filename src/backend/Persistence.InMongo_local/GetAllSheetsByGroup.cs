using DomainModel.Classes;
using DomainModel.Services;
using MongoDB.Driver;
using System;

namespace Persistence.InMongo_local
{
    public class GetAllSheetsByGroup : IGetAllSheetsByGroup
    {
        private readonly DbContext dbContext;

        public GetAllSheetsByGroup(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public AllSheets Get(string group)
        {
            if (string.IsNullOrEmpty(group))
            {
                return new AllSheets()
                {
                    Patients = this.dbContext.Patients.AsQueryable().ToList(),
                    Suspects = this.dbContext.Suspects.AsQueryable().ToList()
                };
            }

            var filterPatients = Builders<Patient>.Filter.Eq(x => x.Group, group);
            var filterSuspects = Builders<Suspect>.Filter.Eq(x => x.Group, group);

            var patients = this.dbContext.Patients.Find(filterPatients).ToList();
            var suspects = this.dbContext.Suspects.Find(filterSuspects).ToList();

            return new AllSheets()
            {
                Patients = patients,
                Suspects = suspects
            };
        }
    }
}
