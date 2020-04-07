using System;

namespace DomainModel.Classes
{
    public class SuspectData
    {
        public string QuarantinePlace { get; set; }

        public DateTime ExpectedWorkReturnDate { get; set; }

        public DateTime? ActualWorkReturnDate { get; set; }

        public HealthMeasure HealthMeasure { get; set; }

        public DateTime UpdateTime { get; set; }

        public string UpdatedBy { get; set; }

        public Link Link { get; set; }
    }
}
