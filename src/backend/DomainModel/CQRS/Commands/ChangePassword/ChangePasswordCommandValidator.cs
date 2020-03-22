using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using CQRS.Commands.Validators;
using CQRS.Validation;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DomainModel.CQRS.Commands.ChangePassword
{
    public class ChangePasswordCommandValidator : ICommandValidator<ChangePasswordCommand>
    {
        private readonly IGetSessionContext getSessionContext;

        public ChangePasswordCommandValidator(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
        }

        public IEnumerable<ValidationResult> Validate(ChangePasswordCommand command)
        {
            // Admin, as always, can do anything
            if (this.getSessionContext.LoggedUserIsAdmin())
                yield break;

            // new password must be at least n digits long
            if (command.NewPassword.Length < 6)
                yield return new ValidationResult("Password must contain at least 6 characters.");

            // new password must contain at least one digit
            if (!command.NewPassword.Any(c => char.IsDigit(c)))
                yield return new ValidationResult("The new password must contain at least one digit.");

            // new password must contain at least one letter
            if (!command.NewPassword.Any(c => char.IsLetter(c)))
                yield return new ValidationResult("The new password must contain at least one letter.");
        }
    }
}