namespace DomainModel.CQRS.Commands.UpdatePositive
{
    public class UpdatePositiveCommand
    {
        public int CaseNumber { get; set; }

        public string Nome { get; set; }

        public string Cognome { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Role { get; set; }
    }
}
