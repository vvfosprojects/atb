using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Classes
{
    public class SuspectData
    {
        //public int CaseNumber { get; set; }

        public string QuarantinePlace { get; set; }

        public DateTime ExpectedWorkReturnDate { get; set; }

        public DateTime? ActualWorkReturnDate { get; set; }

        public bool ClosedCase { get; set; }

        public DateTime UpdateTime { get; set; }

        public string UpdatedBy { get; set; }

    }
}
