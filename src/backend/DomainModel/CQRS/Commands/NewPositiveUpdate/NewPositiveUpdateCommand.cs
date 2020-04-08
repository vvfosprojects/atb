using DomainModel.Classes;
using System;

namespace DomainModel.CQRS.Commands.NewPositiveUpdate
{
    public class NewPositiveUpdateCommand
    {
        public int CaseNumber { get; set; }

        public string EstremiProvvedimentiASL { get; set; }

        public string QuarantinePlace { get; set; }

        public DateTime DiseaseConfirmDate { get; set; }

        public DateTime? ExpectedWorkReturnDate { get; set; }

        public DateTime? ActualWorkReturnDate { get; set; }

        public bool ConvertToSuspect { get; set; }

        public Link Link { get; set; }

        public int? SuspectSheetNum { get; set; }
    }
}
