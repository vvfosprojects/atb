﻿using System.Collections.Generic;
using System.Text.RegularExpressions;
using CQRS.Commands.Validators;
using CQRS.Validation;

namespace DomainModel.CQRS.Commands.NewSuspectCommand
{
    public class NewSuspectCommandValidator : ICommandValidator<NewSuspectCommand>
    {
        public IEnumerable<ValidationResult> Validate(NewSuspectCommand command)
        {
            const string regexEmail = @"\A(?:[a-zA-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)\Z";
            const string regex = "^[a-zA-Z ']*$";

            // Number
            if (command.Number.HasValue && command.Number <= 0)
            {
                yield return new ValidationResult("The case number must be positive");
                yield break;
            }

            // Email
            if (!string.IsNullOrWhiteSpace(command.Email) && !Regex.IsMatch(command.Email, regexEmail))
            {
                yield return new ValidationResult(command.Email + " is not a valid Email address");
                yield break;
            }

            // Name
            if (!string.IsNullOrWhiteSpace(command.Name) && !Regex.IsMatch(command.Name, regex))
            {
                yield return new ValidationResult("The Name is not in a valid format");
                yield break;
            }

            // Surname
            if (!string.IsNullOrWhiteSpace(command.Surname) && !Regex.IsMatch(command.Surname, regex))
            {
                yield return new ValidationResult("The Surname is not in a valid format");
                yield break;
            }
        }
    }
}