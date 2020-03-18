using System.Collections.Generic;

namespace DomainModel.Classes
{
    public class Patient
    {
        public string Id { get; protected set; }

        public string Group { get; set; }

        public Anagrafica Data { get; set; }

        public List<PositiveData> Updates { get; set; }

    }
}
