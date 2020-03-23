using DomainModel.Classes;
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
        private readonly IGetAllPositiveSheets getAllPositiveSheets;
        private readonly IGetAllSuspectSheets getAllSuspectSheets;
        private readonly ICryptools cryptools;

        public GetCSV(DbContext dbContext, IGetAllSuspectSheets getAllSuspectSheets, IGetAllPositiveSheets getAllPositiveSheets, ICryptools cryptools)
        {
            this.dbContext = dbContext;
            this.getAllSuspectSheets = getAllSuspectSheets;
            this.getAllPositiveSheets = getAllPositiveSheets;
            this.cryptools = cryptools;
        }

        public string GenerateCSV(GetCSVQuery query)
        {
            var patients = this.dbContext.Patients.AsQueryable().ToList();
            var suspects = this.dbContext.Suspects.AsQueryable().ToList();

            //Attualmente non è presente il campo Data Di rientro effettivo poichè essendo nullable devo gestire il parsing

            StringBuilder sw = new StringBuilder();
            sw.AppendFormat("Paziente | Numero Caso| Ruolo | Quarantine Place | Data Attesa Di Rientro | Deceduto | Data Creazione | Data Aggiornamento");
            sw.AppendLine();

            foreach(var s in patients)
            {
                var str = string.Format("{0}|{1}|{2}|{3}|{4}|{5}",
                                  "P",    
                                  s.Subject.Number,
                                  cryptools.Decrypt(s.Subject.Role),
                                  s.Data.Last().QuarantinePlace,
                                  //s.Data.Last().ExpectedWorkReturnDate.ToString("dd/MM/yyyy"),
                                  s.Data.First().UpdateTime.ToString("dd/MM/yyyy"),
                                  s.Data.Last().UpdateTime.ToString("dd/MM/yyyy")
                                  );
                sw.AppendLine(str);
            }

            foreach (var p in suspects)
            {
                var str = string.Format("{0}|{1}|{2}|{3}|{4}|{5}",
                                  "S",
                                  p.Subject.Number,
                                  cryptools.Decrypt(p.Subject.Role),
                                  p.Data.Last().QuarantinePlace,
                                  //p.Data.Last().ExpectedWorkReturnDate.ToString("dd/MM/yyyy"),
                                  "null",
                                  p.Data.First().UpdateTime.ToString("dd/MM/yyyy"),
                                  p.Data.Last().UpdateTime.ToString("dd/MM/yyyy")
                                  );
                sw.AppendLine(str);
            }

            return sw.ToString();
        }
    }
}
