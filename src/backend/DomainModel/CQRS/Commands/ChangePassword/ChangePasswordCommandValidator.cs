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
                yield return new ValidationResult("La password deve contenere almeno 6 caratteri.");

            // new password must contain at least one digit
            if (!command.NewPassword.Any(c => char.IsDigit(c)))
                yield return new ValidationResult("La nuova password deve contenere almeno un numero.");

            // new password must contain at least one letter
            if (!command.NewPassword.Any(c => char.IsLetter(c)))
                yield return new ValidationResult("La nuova password deve contenere almeno una lettera.");
        }
    }
}