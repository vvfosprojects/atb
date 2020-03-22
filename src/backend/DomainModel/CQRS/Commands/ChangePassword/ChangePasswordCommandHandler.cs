using CQRS.Commands;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Commands.ChangePassword
{
    internal class ChangePasswordCommandHandler : ICommandHandler<ChangePasswordCommand>
    {
        private readonly IChangePassword changePassword;

        public ChangePasswordCommandHandler(IChangePassword changePassword)
        {
            this.changePassword = changePassword ?? throw new ArgumentNullException(nameof(changePassword));
        }

        public void Handle(ChangePasswordCommand command)
        {
            var newPwdHash = ShaGenerator.ComputeSha256Hash(command.NewPassword);
            this.changePassword.Change(command.Username, newPwdHash);
        }
    }
}