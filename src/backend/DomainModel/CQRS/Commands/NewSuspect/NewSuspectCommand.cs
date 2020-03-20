namespace DomainModel.CQRS.Commands.NewSuspectCommand
{
    public class NewSuspectCommand
    {
        public int Number { get; set; }

        public string Group { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Role { get; set; }
    }
}
