using CQRS.Commands.Validators;
using CQRS.Validation;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace DomainModel.CQRS.Commands.UpdateSuspect
{
    public class UpdateSuspectCommandValidator : ICommandValidator<UpdateSuspectCommand>
    {
        public IEnumerable<ValidationResult> Validate(UpdateSuspectCommand command)
        {
            const string regexEmail = @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z";
            const string regex = "^[a-zA-Z ]*$";
            

            if (!Regex.IsMatch(command.Email, regexEmail))
            {
                yield return new ValidationResult(command.Email + " is not a valid Email address");
                yield break;
            }

            if (!Regex.IsMatch(command.Nome, regex))
            {
                yield return new ValidationResult("The Name is not in a valid format");
                yield break;
            }


            if (!Regex.IsMatch(command.Cognome, regex))
            {
                yield return new ValidationResult("The Surname is not in a valid format");
                yield break;
            }
        }
    }
}
