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

                if (this.Data.Last().Link != null && lastUpdate.Link.Closed == true)
                    return true;

                if (!lastUpdate.ActualWorkReturnDate.HasValue)
                    return false;

                return lastUpdate.ActualWorkReturnDate.Value.Date < DateTime.UtcNow;
            }
        }

        public DateTime LastUpdateTime
        {
            get
            {
                if (!this.Data.Any())
                    return DateTime.MinValue;

                var lastUpdate = this.Data.Last();

                return lastUpdate.UpdateTime;
            }
        }
    }
}