using System;

namespace DomainModel.Classes
{
    public class PositiveData
    {
        //public int CaseNumbe
        public string EstremiProvvedimentiASL { get; set; }

        public string QuarantinePlace { get; set; }

        public DateTime DiseaseConfirmDate { get; set; }

        public DateTime? ExpectedWorkReturnDate { get; set; }

        public DateTime? ActualWorkReturnDate { get; set; }

        public DateTime UpdateTime { get; set; }

        public string UpdatedBy { get; set; }
    }
}
