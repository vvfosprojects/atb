using DomainModel.Services.Groups;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence.InMongo_local
{
    internal class GetAllGroups : IGetAllGroups
    {
        private readonly DbContext dbContext;

        public GetAllGroups(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public IEnumerable<string> Get()
        {
            var patientsGroups = this.dbContext.Patients.Aggregate()
                .Group(p => p.Group,
                    g => new
                    {
                        Key = g.Key
                    })
                .SortBy(g => g.Key)
                .ToList();

            var suspectsGroups = this.dbContext.Suspects.Aggregate()
                .Group(p => p.Group,
                    g => new
                    {
                        Key = g.Key
                    })
                .SortBy(g => g.Key)
                .ToList();

            return patientsGroups
                .Concat(suspectsGroups)
                .Distinct()
                .Select(g => g.Key)
                .OrderBy(g => g);
        }
    }
}