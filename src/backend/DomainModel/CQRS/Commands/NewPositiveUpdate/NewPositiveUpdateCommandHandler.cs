using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Commands.NewPositiveUpdate
{
    public class NewPositiveUpdateCommandHandler
    {
        private readonly INewPositiveUpdate newPositiveUpdate;

        public NewPositiveUpdateCommandHandler(INewPositiveUpdate newPositiveUpdate)
        {
            this.newPositiveUpdate = newPositiveUpdate;
        }

        public void Handle(NewPositiveUpdateCommand command)
        {
            this.newPositiveUpdate.Add(command);
        }
    }
}
