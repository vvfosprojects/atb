using CQRS.Commands;
using DomainModel.Classes;
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
        private readonly IGetPatientByCaseNumber getPatientByCaseNumber;

        public NewPositiveUpdateCommandHandler(INewPositiveUpdate newPositiveUpdate, IGetSuspectByCaseNumber getSuspectByCaseNumber, 
            IGetSessionContext getSessionContext, INewSuspectUpdate newSuspectUpdate, IGetPatientByCaseNumber getPatientByCaseNumber)
        {
            this.newPositiveUpdate = newPositiveUpdate ?? throw new ArgumentNullException(nameof(newPositiveUpdate));
            this.getSuspectByCaseNumber = getSuspectByCaseNumber ?? throw new ArgumentNullException(nameof(getSuspectByCaseNumber));
            this.getSessionContext = getSessionContext;
            this.newSuspectUpdate = newSuspectUpdate;
            this.getPatientByCaseNumber = getPatientByCaseNumber;
        }

        public void Handle(NewPositiveUpdateCommand command)
        {
            //se devo convertire un positivo in un sospetto
            if (command.ConvertToSuspect)
            {
                var positiveSheet = this.getPatientByCaseNumber.GetPatient(command.CaseNumber, this.getSessionContext.GetActiveGroup());

                var link = positiveSheet.Data.Where(x => x.Link != null).SingleOrDefault();

                //check if link already exists
                if (link != null)
                {
                    this.newPositiveUpdate.Add(command);
                    command.SuspectSheetNum = null;
                }

                else { }
            }

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
                        ActualWorkReturnDate = null,
                        QuarantinePlace = sheetSuspect.Data.Last().QuarantinePlace,
                        ExpectedWorkReturnDate = sheetSuspect.Data.Last().ExpectedWorkReturnDate,
                        HealthMeasure = new HealthMeasure
                        {
                            By = sheetSuspect.Data.Last().HealthMeasure.By,
                            Code = sheetSuspect.Data.Last().HealthMeasure.Code
                        }
                    });
                }
            }
            else
            {
                this.newPositiveUpdate.Add(command);
            }
        }
    }
}
