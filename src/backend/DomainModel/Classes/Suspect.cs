using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Classes
{
    public class Suspect
    {
        public Suspect()
        {
            Updates = new List<SuspectData>();
        }

        public string Id { get; protected set; }

        public string Group { get; set; }

        public Anagrafica Data { get; set; }

        public IList<SuspectData> Updates { get; set; }

    }
}
