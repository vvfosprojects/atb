namespace DomainModel.CQRS.Commands.ChangePassword
{
    public class ChangePasswordCommand
    {
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}