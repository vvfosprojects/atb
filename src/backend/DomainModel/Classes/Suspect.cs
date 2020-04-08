using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DomainModel.Classes
{
    public class Suspect
    {
        public Suspect()
        {
            Data = new List<SuspectData>();
        }

        public string Id { get; protected set; }

        public string Group { get; set; }

        public Anagrafica Subject { get; set; }

        public IList<SuspectData> Data { get; set; }

        public bool Closed
        {
            get
            {
                if (!this.Data.Any())
                    return false;

                var lastUpdate = this.Data.Last();

                if (lastUpdate.Link.Closed == true)
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