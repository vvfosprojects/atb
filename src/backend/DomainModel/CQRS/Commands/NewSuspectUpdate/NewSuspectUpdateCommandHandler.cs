using CQRS.Commands;
using DomainModel.Classes;
using DomainModel.CQRS.Commands.NewPositiveUpdate;
using DomainModel.Services;
using DomainModel.Services.Users;
using System;
using System.Linq;

namespace DomainModel.CQRS.Commands.NewSuspectUpdate
{
    public class NewSuspectUpdateCommandHandler : ICommandHandler<NewSuspectUpdateCommand>
    {
        private readonly INewSuspectUpdate newSuspectUpdate;
        private readonly IGetSuspectByCaseNumber getSuspectByCaseNumber;
        private readonly IGetSessionContext getSessionContext;
        private readonly INewPositiveUpdate newPositiveUpdate;

        public NewSuspectUpdateCommandHandler(INewSuspectUpdate newSuspectUpdate, IGetSuspectByCaseNumber getSuspectByCaseNumber, IGetSessionContext getSessionContext, INewPositiveUpdate newPositiveUpdate)
        {
            this.newSuspectUpdate = newSuspectUpdate;
            this.getSuspectByCaseNumber = getSuspectByCaseNumber;
            this.getSessionContext = getSessionContext;
            this.newPositiveUpdate = newPositiveUpdate;
        }

        public void Handle(NewSuspectUpdateCommand command)
        {
            //se deve essere convertito in positivo
            if (command.ConvertToPositive)
            {
                //recuperato la scheda
                var sheet = this.getSuspectByCaseNumber.GetSuspect(command.CaseNumber, this.getSessionContext.GetActiveGroup());
                //check if already linked
                var link = sheet.Data.Where(x => x.Link != null).SingleOrDefault();
                
                //se link è null allora non esiste nessun link ai positivi, quindi aggiunto
                if (link == null)
                {
                    this.newSuspectUpdate.Add(command);
                    command.PositiveSheetNum = null;
                }

                //altrimenti se già esiste
                else 
                {
                    //aggiorno il suspect
                    this.newSuspectUpdate.Add(new NewSuspectUpdateCommand()
                    {
                        ActualWorkReturnDate = command.ActualWorkReturnDate,
                        CaseNumber = command.CaseNumber,
                        ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
                        HealthMeasure = command.HealthMeasure,
                        QuarantinePlace = command.QuarantinePlace,
                        Link = new Link()
                        {
                            CaseNumber = link.Link.CaseNumber,
                            Closed = true
                        }
                    });

                    command.PositiveSheetNum = link.Link.CaseNumber;

                    var positiveCommand = new NewPositiveUpdateCommand()
                    {
                        ActualWorkReturnDate = null,
                        EstremiProvvedimentiASL = null,
                        ExpectedWorkReturnDate = null,
                        QuarantinePlace = command.QuarantinePlace,
                        CaseNumber = link.Link.CaseNumber,
                        DiseaseConfirmDate = DateTime.UtcNow,
                        Link = new Link()
                        {
                            CaseNumber = command.CaseNumber,
                            Closed = false
                        }
                    };
                    //aggiorno il positivo
                    this.newPositiveUpdate.Add(positiveCommand);
                }
            }
            //altrimenti procedo normalmente
            else
            {
                this.newSuspectUpdate.Add(command);
            }
        }
    }
}
