using System.Collections.Generic;

namespace DomainModel.Classes
{
    public class Patient
    {
        public Patient()
        {
            Updates = new List<PositiveData>();
        }

        public string Id { get; protected set; }

        public string Group { get; set; }

        public Anagrafica Data { get; set; }

        public IList<PositiveData> Updates { get; set; }
    }
}