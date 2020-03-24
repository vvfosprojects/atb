using CQRS.Logging;

namespace DomainModel.CQRS.Commands.AddPatientCommand
{
    public class NewPositiveCaseCommand : IHasCustomAudit
    {
        public int? Number { get; set; }

        public string Group { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Role { get; set; }

        public string SerializeForAudit()
        {
            return this.ToString();
        }

        public override string ToString()
        {
            return $"{{ Number: { this.Number }, ... <suppressed> }}";
        }
    }
}