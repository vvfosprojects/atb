using CQRS.Commands;
using DomainModel.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Commands.NewSuspectUpdate
{
    public class NewSuspectUpdateCommandHandler : ICommandHandler<NewSuspectUpdateCommand>
    {
        private readonly INewSuspectUpdate newSuspectUpdate;
        public NewSuspectUpdateCommandHandler(INewSuspectUpdate newSuspectUpdate)
        {
            this.newSuspectUpdate = newSuspectUpdate;
        }

        public void Handle(NewSuspectUpdateCommand command)
        {
            this.newSuspectUpdate.Add(command);
        }
    }
}
