using DomainModel.CQRS.Commands.KeepAlive;
using DomainModel.CQRS.Queries.GetLastUpdatePerGroup;
using DomainModel.Services;
using DomainModel.Services.Users;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistence.InMongo_local
{
    internal class GetLastUpdatePerGroup_Linq : IGetLastUpdatePerGroup
    {
        private readonly DbContext dbContext;

        public GetLastUpdatePerGroup_Linq(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public string GenerateCSV(GetLastUpdatePerGroupQuery query)
        {
            var d = new Dictionary<string, DateTime>();
            var patientSheets = this.dbContext.Patients.AsQueryable().ToEnumerable();

            foreach (var s in patientSheets)
            {
                var group = s.Group;
                var lastUpdateTime = s.LastUpdateTime;
                if (!d.ContainsKey(group) || (d[group] < lastUpdateTime))
                    d[group] = lastUpdateTime;
            }

            var suspectsSheets = this.dbContext.Suspects.AsQueryable().ToEnumerable();

            foreach (var s in suspectsSheets)
            {
                var group = s.Group;
                var lastUpdateTime = s.LastUpdateTime;
                if (!d.ContainsKey(group) || (d[group] < lastUpdateTime))
                    d[group] = lastUpdateTime;
            }

            var updateTimes = this.dbContext.KeepAlives.AsQueryable().ToEnumerable();

            foreach (var ut in updateTimes)
            {
                var group = ut.Group;
                if (!d.ContainsKey(group) || (d[group] < ut.Data))
                    d[group] = ut.Data;
            }

            var sb = new StringBuilder();
            sb.AppendLine("Gruppo|Data");
            foreach (var kv in d)
            {
                var date = kv.Value.ToString("dd/MM/yyyy HH:mm:ss");
                sb.AppendLine($"{ kv.Key }|{ date }");
            }

            return sb.ToString();
        }
    }
}