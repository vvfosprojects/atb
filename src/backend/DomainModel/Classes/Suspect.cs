using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Classes
{
    public class Suspect
    {
        public string Id { get; protected set; }

        public string Group { get; set; }

        public Anagrafica Data { get; set; }

        public List<SuspectData> Updates { get; set; }

    }
}
