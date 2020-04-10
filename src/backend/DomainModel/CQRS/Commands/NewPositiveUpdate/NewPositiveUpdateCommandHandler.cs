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
            if (command.ConvertToSuspect)
            {
                var positiveSheet = this.getPatientByCaseNumber.GetPatient(command.CaseNumber, this.getSessionContext.GetActiveGroup());
                var dataLink = positiveSheet.Data.Where(x => x.Link != null).LastOrDefault();
                var link = dataLink != null ? dataLink.Link : null;

                if (link == null)
                {
                    //TRASFORMA POSITIVO IN SOSPETTO CON SCHEDA SOSPETTO INESISTENTE
                    /*
                     * Nel dto di input troverò ConvertToSuspect = true, la discriminante sarà la presenza nella scheda positivo della proprietà link == null --> POSITIVO INESISTENTE
                     */
                    this.newPositiveUpdate.Add(command);
                    command.SuspectSheetNum = null;
                }
                else
                {
                    //TRASFORMA POSITIVO IN SOSPETTO CON SCHEDA SOSPETTO ESISTENTE
                    /*
                     * Nel dto di input troverò ConvertToSuspect = true, la discriminante sarà la presenza nella scheda positivo della proprietà link != null --> POSITIVO ESISTENTE
                     */

                    /*
                    * Nel dto di input troverò ConvertToPositive = true, la discriminante sarà la presenza nella scheda sospetto della proprietà link != null --> SOSPETTO ESISTENTE
                    */

                    //CHIUSURA DELLA SCHEDA SOSPETTO
                    var actualWorkReturnDate = positiveSheet.Data.Last().ActualWorkReturnDate != null ? positiveSheet.Data.Last().ActualWorkReturnDate : null;
                    var expectedWorkReturnDate = positiveSheet.Data.Last().ExpectedWorkReturnDate != null ? positiveSheet.Data.Last().ExpectedWorkReturnDate : null;


                    var positiveCommand = new NewPositiveUpdateCommand()
                    {
                        ActualWorkReturnDate = actualWorkReturnDate,
                        CaseNumber = command.CaseNumber,
                        ExpectedWorkReturnDate = expectedWorkReturnDate,
                        QuarantinePlace = positiveSheet.Data.Last().QuarantinePlace,
                        DiseaseConfirmDate = positiveSheet.Data.Last().DiseaseConfirmDate,
                        EstremiProvvedimentiASL = positiveSheet.Data.Last().EstremiProvvedimentiASL,
                        Link = new Link()
                        {
                            CaseNumber = link.CaseNumber,
                            Closed = true
                        }
                    };

                    this.newPositiveUpdate.Add(positiveCommand);

                    //RIAPERTURA DELLA SCHEDA POSITIVA GIA ESISTENTE
                    var suspectSheet = this.getSuspectByCaseNumber.GetSuspect(link.CaseNumber, this.getSessionContext.GetActiveGroup());

                    var suspectCommand = new NewSuspectUpdateCommand()
                    {
                        ActualWorkReturnDate = suspectSheet.Data.Last().ActualWorkReturnDate,
                        CaseNumber = suspectSheet.Data.Last().Link.CaseNumber,
                        ExpectedWorkReturnDate = suspectSheet.Data.Last().ExpectedWorkReturnDate,
                        HealthMeasure = suspectSheet.Data.Last().HealthMeasure,
                        QuarantinePlace = positiveSheet.Data.Last().QuarantinePlace,
                        Link = new Link()
                        {
                            CaseNumber = command.CaseNumber,
                            Closed = false
                        }
                    };

                    this.newSuspectUpdate.Add(suspectCommand);
                    command.SuspectSheetNum = suspectCommand.CaseNumber;
                }
            }
            else
            {
                if (command.Link != null)
                {
                    //PROCEDO CON IL SECONDO PASSO DELL'AGGIORNAMENTO PER UN SOSPETTO INESISTENTE
                    
                    var suspectSheet = this.getSuspectByCaseNumber.GetSuspect(command.Link.CaseNumber, this.getSessionContext.GetActiveGroup());
                    if (suspectSheet.Data.Last().Link != null)
                    {
                        //Eccezione - esiste già un link alla scheda positivo
                    }

                    var actualWorkReturnDate = suspectSheet.Data.Last().ActualWorkReturnDate != null ? suspectSheet.Data.Last().ActualWorkReturnDate : null;

                    //SCHEDA SOSPETTO - LA PROPRIETA' LINK.CLOSED A TRUE E PASSO IL RIFERIMENTO ALLA SCHEDA POSITIVO
                    var suspectCommand = new NewSuspectUpdateCommand()
                    {
                        ActualWorkReturnDate = actualWorkReturnDate,
                        ExpectedWorkReturnDate = suspectSheet.Data.Last().ExpectedWorkReturnDate,
                        CaseNumber = command.Link.CaseNumber,
                        HealthMeasure = suspectSheet.Data.Last().HealthMeasure,
                        QuarantinePlace = suspectSheet.Data.Last().QuarantinePlace,
                        Link = new Link()
                        {
                            CaseNumber = command.CaseNumber,
                            Closed = true
                        }
                    };
                    //AGGIORNO LA SCHEDA SOSPETTO E LA CHIUDO
                    this.newSuspectUpdate.Add(suspectCommand);

                    //AGGIORNO I DATA DELLA SCHEDA POSITIVO
                    //var positiveCommand = new NewPositiveUpdateCommand()
                    //{
                    //    ActualWorkReturnDate = command.ActualWorkReturnDate,
                    //    CaseNumber = command.CaseNumber,
                    //    DiseaseConfirmDate = command.DiseaseConfirmDate,
                    //    EstremiProvvedimentiASL = command.EstremiProvvedimentiASL,
                    //    ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
                    //    QuarantinePlace = command.QuarantinePlace,
                    //    Link = command.Link
                    //};
                    this.newPositiveUpdate.Add(command);
                }

                else
                {
                    //UPDATE SEMPLICE DEL POSITIVO
                    /*
                     * Nel dto di input troverò ConvertToPositive = false
                     */
                    this.newPositiveUpdate.Add(command);
                }
            }
        }
    }
}
