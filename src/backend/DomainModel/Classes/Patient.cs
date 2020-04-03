using System;
using System.Collections.Generic;
using System.Linq;

namespace DomainModel.Classes
{
    public class Patient
    {
        public Patient()
        {
            Data = new List<PositiveData>();
        }

        public string Id { get; protected set; }

        public string Group { get; set; }

        public Anagrafica Subject { get; set; }

        public IList<PositiveData> Data { get; set; }

        public bool Closed
        {
            get
            {
                if (!this.Data.Any())
                    return false;

                var lastUpdate = this.Data.Last();

                if (lastUpdate.DateOfDeath.HasValue)
                    return true;

                if (!lastUpdate.ActualWorkReturnDate.HasValue)
                    return false;

                return lastUpdate.ActualWorkReturnDate.Value.Date < DateTime.UtcNow;
            }
        }
    }
}