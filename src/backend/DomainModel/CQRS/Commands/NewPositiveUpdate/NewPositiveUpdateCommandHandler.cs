using CQRS.Commands;
using DomainModel.Classes;
using DomainModel.Classes.Exceptions;
using DomainModel.CQRS.Commands.NewSuspectUpdate;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;
using System.Linq;

namespace DomainModel.CQRS.Commands.NewPositiveUpdate
{
    public class NewPositiveUpdateCommandHandler : ICommandHandler<NewPositiveUpdateCommand>
    {
        private readonly INewPositiveUpdate newPositiveUpdate;
        private readonly IGetSuspectByCaseNumber getSuspectByCaseNumber;
        private readonly IGetSessionContext getSessionContext;
        private readonly INewSuspectUpdate newSuspectUpdate;

        public NewPositiveUpdateCommandHandler(INewPositiveUpdate newPositiveUpdate, IGetSuspectByCaseNumber getSuspectByCaseNumber, IGetSessionContext getSessionContext, INewSuspectUpdate newSuspectUpdate)
        {
            this.newPositiveUpdate = newPositiveUpdate ?? throw new ArgumentNullException(nameof(newPositiveUpdate));
            this.getSuspectByCaseNumber = getSuspectByCaseNumber ?? throw new ArgumentNullException(nameof(getSuspectByCaseNumber));
            this.getSessionContext = getSessionContext;
            this.newSuspectUpdate = newSuspectUpdate;
        }

        public void Handle(NewPositiveUpdateCommand command)
        {
            if (command.Link != null)
            {
                var sheetSuspect = this.getSuspectByCaseNumber.GetSuspect(command.Link.CaseNumber, this.getSessionContext.GetActiveGroup());
                
                //check if already exist a link
                var link = sheetSuspect.Data.Where(x => x.Link != null).SingleOrDefault();

                //if link doesn't exists
                if (link == null)
                {
                    this.newPositiveUpdate.Add(command);
                    this.newSuspectUpdate.Add(new NewSuspectUpdateCommand()
                    {
                        CaseNumber = command.Link.CaseNumber,
                        Link = new Link()
                        {
                            CaseNumber = command.CaseNumber,
                            Closed = true
                        },
                        HealthMeasure = new HealthMeasure
                        {
                            By = null,
                            Code = null
                        }
                    });  
                }
                else
                {
                    throw new AtbApplicationException("The link already exists");
                }
            }

            else
            {
                this.newPositiveUpdate.Add(command);
            }

        }
    }
}
