using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Commands.NewSuspectUpdate
{
    public class NewSuspectUpdateCommand
    {
        public int CaseNumber { get; set; }

        public string QuarantinePlace { get; set; }

        public DateTime ExpectedWorkReturnDate { get; set; }

        public DateTime? ActualWorkReturnDate { get; set; }

        public bool ClosedCase { get; set; }
    }
}
