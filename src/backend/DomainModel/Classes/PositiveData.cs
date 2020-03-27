using MongoDB.Bson.Serialization.Attributes;
using System;

namespace DomainModel.Classes
{
    public class PositiveData
    {
        public string EstremiProvvedimentiASL { get; set; }

        public string QuarantinePlace { get; set; }

        public DateTime DiseaseConfirmDate { get; set; }

        public DateTime? DateOfDeath { get; set; }

        public DateTime? ExpectedWorkReturnDate { get; set; }

        public DateTime? ActualWorkReturnDate { get; set; }

        public DateTime UpdateTime { get; set; }

        public string UpdatedBy { get; set; }
    }
}
