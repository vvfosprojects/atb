using DomainModel.CQRS.Queries.GetCSV;
using DomainModel.Services;
using MongoDB.Driver;
using System;
using System.Linq;
using System.Text;

namespace Persistence.InMongo_local
{
    public class GetCSV : IGetCSV
    {
        private readonly DbContext dbContext;
        private readonly ICryptools cryptools;

        public GetCSV(DbContext dbContext, ICryptools cryptools)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.cryptools = cryptools ?? throw new ArgumentNullException(nameof(cryptools));
        }

        public string GenerateCSV(GetCSVQuery query)
        {
            var patients = this.dbContext.Patients.AsQueryable().ToList();
            var suspects = this.dbContext.Suspects.AsQueryable().ToList();

            StringBuilder sw = new StringBuilder();
            sw.AppendFormat("Paziente|Gruppo|Numero Caso|Ruolo|Quarantine Place|Data Attesa Di Rientro|Data Effettiva Di Rientro|Data Creazione|Data Aggiornamento");
            sw.AppendLine();

            foreach(var s in patients)
            {
                string expectedDate = "null";
                string actualDate = "null";
                if (s.Data.Last().ExpectedWorkReturnDate.HasValue)
                    expectedDate = s.Data.Last().ExpectedWorkReturnDate.Value.ToString("dd/MM/yyyy");
                if (s.Data.Last().ActualWorkReturnDate.HasValue)
                    actualDate = s.Data.Last().ActualWorkReturnDate.Value.ToString("dd/MM/yyyy");

                var str = string.Format("{0}|{1}|{2}|{3}|{4}|{5}|{6}|{7}|{8}",
                                  "P",    
                                  s.Group,
                                  s.Subject.Number,
                                  cryptools.Decrypt(s.Subject.Role),
                                  s.Data.Last().QuarantinePlace,
                                  expectedDate,
                                  actualDate,
                                  s.Data.First().UpdateTime.ToString("dd/MM/yyyy"),
                                  s.Data.Last().UpdateTime.ToString("dd/MM/yyyy")
                                  );
                sw.AppendLine(str);
            }

            foreach (var p in suspects)
            {
                var actualDate = "null";
                if (p.Data.Last().ActualWorkReturnDate.HasValue)
                    actualDate = p.Data.Last().ActualWorkReturnDate.Value.ToString("dd/MM/yyyy");

                var str = string.Format("{0}|{1}|{2}|{3}|{4}|{5}|{6}|{7}|{8}",
                                  "S",
                                  p.Group,
                                  p.Subject.Number,
                                  cryptools.Decrypt(p.Subject.Role),
                                  p.Data.Last().QuarantinePlace,
                                  p.Data.Last().ExpectedWorkReturnDate.ToString("dd/MM/yyyy"),
                                  actualDate,
                                  p.Data.First().UpdateTime.ToString("dd/MM/yyyy"),
                                  p.Data.Last().UpdateTime.ToString("dd/MM/yyyy")
                                  );
                sw.AppendLine(str);
            }

            return sw.ToString();
        }
    }
}
