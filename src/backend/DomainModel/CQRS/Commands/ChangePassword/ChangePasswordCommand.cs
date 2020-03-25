using CQRS.Logging;

namespace DomainModel.CQRS.Commands.ChangePassword
{
    public class ChangePasswordCommand : IHasCustomAudit
    {
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }

        public string SerializeForAudit()
        {
            return this.ToString();
        }

        public override string ToString()
        {
            return $"{{ Username: \"{ this.Username }\", OldPwd: \"***\", NewPwd: \"***\" }}";
        }
    }
}