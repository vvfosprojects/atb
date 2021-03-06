﻿using System.Collections.Generic;
using System.Text.RegularExpressions;
using CQRS.Commands.Validators;
using CQRS.Validation;
using DomainModel.CQRS.Commands.NewPositiveCase;

namespace DomainModel.CQRS.Commands.NewSuspectCommand
{
    public class NewPositiveCaseCommandValidator : ICommandValidator<NewPositiveCaseCommand>
    {
        public IEnumerable<ValidationResult> Validate(NewPositiveCaseCommand command)
        {

            const string regexEmail = @"\A(?:[a-zA-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)\Z";
            const string regex = "^[a-zA-Z ']*$";


            if (command.Number < 0)
            {
                yield return new ValidationResult("The case number must be positive");
                yield break;
            }


            if (!Regex.IsMatch(command.Email, regexEmail))
            {
                yield return new ValidationResult(command.Email + " is not a valid Email address");
                yield break;
            }

            if (!Regex.IsMatch(command.Name, regex))
            {
                yield return new ValidationResult("The Name is not in a valid format");
                yield break;
            }


            if (!Regex.IsMatch(command.Surname, regex))
            {
                yield return new ValidationResult("The Surname is not in a valid format");
                yield break;
            }
        }
    }
}
