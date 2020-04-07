using DomainModel.Classes;
using System;

namespace DomainModel.CQRS.Commands.NewSuspectUpdate
{
    public class NewSuspectUpdateCommand
    {
        public int CaseNumber { get; set; }

        public string QuarantinePlace { get; set; }

        public HealthMeasure HealthMeasure { get; set; }

        public DateTime ExpectedWorkReturnDate { get; set; }

        public DateTime? ActualWorkReturnDate { get; set; }

        public bool ConvertToPositive { get; set; }

        public Link Link { get; set; }

        public int? PositiveSheetNum { get; set; } 
    }
}
