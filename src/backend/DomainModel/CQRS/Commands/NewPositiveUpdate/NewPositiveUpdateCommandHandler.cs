using CQRS.Commands;
using DomainModel.Services;
using System;

namespace DomainModel.CQRS.Commands.NewPositiveUpdate
{
    public class NewPositiveUpdateCommandHandler : ICommandHandler<NewPositiveUpdateCommand>
    {
        private readonly INewPositiveUpdate newPositiveUpdate;

        public NewPositiveUpdateCommandHandler(INewPositiveUpdate newPositiveUpdate)
        {
            this.newPositiveUpdate = newPositiveUpdate ?? throw new ArgumentNullException(nameof(newPositiveUpdate));
        }

        public void Handle(NewPositiveUpdateCommand command)
        {
            this.newPositiveUpdate.Add(command);
        }
    }
}
