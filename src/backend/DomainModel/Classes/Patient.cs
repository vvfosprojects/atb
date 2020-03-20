using System.Collections.Generic;

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
    }
}