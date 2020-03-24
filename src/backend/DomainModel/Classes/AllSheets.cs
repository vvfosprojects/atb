using System.Collections.Generic;

namespace DomainModel.Classes
{
    public class AllSheets
    {
        public IList<Patient> Patients { get; set; }

        public IList<Suspect> Suspects { get; set; }
    }
}
