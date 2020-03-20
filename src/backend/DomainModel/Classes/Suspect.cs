using System;
using System.Collections.Generic;
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

    }
}
