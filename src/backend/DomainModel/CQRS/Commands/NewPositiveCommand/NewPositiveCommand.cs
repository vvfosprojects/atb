using System;

namespace DomainModel.CQRS.Commands.AddPatientCommand
{
    public class NewPositiveCommand
    {
        public int Number { get; set; }

        public string Group { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Role { get; set; }

        public string EstremiProvvedimentiASL { get; set; }

        public string QuarantinePlace { get; set; }

        public DateTime ExpectedWorkReturnDate { get; set; }

        public DateTime? ActualWorkReturnDate { get; set; }

        public bool ClosedCase { get; set; }
    }
}
