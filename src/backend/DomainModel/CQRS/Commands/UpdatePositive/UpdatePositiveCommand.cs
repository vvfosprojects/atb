namespace DomainModel.CQRS.Commands.UpdatePositive
{
    public class UpdatePositiveCommand
    {
        public int Number { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public string Role { get; set; }
    }
}
