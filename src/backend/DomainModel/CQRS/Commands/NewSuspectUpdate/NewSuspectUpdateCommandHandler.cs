using CQRS.Commands;
using DomainModel.Classes;
using DomainModel.Classes.Exceptions;
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
        private readonly IGetPatientByCaseNumber getPatientByCaseNumber;

        public NewSuspectUpdateCommandHandler(INewSuspectUpdate newSuspectUpdate, IGetSuspectByCaseNumber getSuspectByCaseNumber, IGetSessionContext getSessionContext, INewPositiveUpdate newPositiveUpdate, IGetPatientByCaseNumber getPatientByCaseNumber)
        {
            this.newSuspectUpdate = newSuspectUpdate;
            this.getSuspectByCaseNumber = getSuspectByCaseNumber;
            this.getSessionContext = getSessionContext;
            this.newPositiveUpdate = newPositiveUpdate;
            this.getPatientByCaseNumber = getPatientByCaseNumber;
        }

        public void Handle(NewSuspectUpdateCommand command)
        {
            if (command.ConvertToPositive)
            {
                //recuperato la scheda
                var suspectSheet = this.getSuspectByCaseNumber.GetSuspect(command.CaseNumber, this.getSessionContext.GetActiveGroup());

                //check if sheet is closed
                if (suspectSheet.Closed)
                {
                    throw new AtbApplicationException("Attenzione: stai tentando di modificare una scheda chiusa!");
                }

                //check if already linked
                var dataLink = suspectSheet.Data.Where(x => x.Link != null).LastOrDefault();
                var link = dataLink != null ? dataLink.Link : null;

                if (link == null)
                {
                    //TRASFORMA SOSPETTO IN POSITIVO CON SCHEDA POSITIVO INESISTENTE
                    /*
                     * Nel dto di input troverò ConvertToPositive = true, la discriminante sarà la presenza nella scheda sospetto della proprietà link == null --> SOSPETTO INESISTENTE
                     */
                    this.newSuspectUpdate.Add(command);
                    command.PositiveSheetNum = null;
                }

                else
                {
                    //TRASFORMA SOSPETTO IN POSITIVO CON SCHEDA POSITIVO ESISTENTE
                    /*
                     * Nel dto di input troverò ConvertToPositive = true, la discriminante sarà la presenza nella scheda sospetto della proprietà link != null --> SOSPETTO ESISTENTE
                     */

                    //CHIUSURA DELLA SCHEDA SOSPETTO
                    var suspectCommand = new NewSuspectUpdateCommand()
                    {
                        ActualWorkReturnDate = suspectSheet.Data.Last().ActualWorkReturnDate,
                        CaseNumber = command.CaseNumber,
                        ExpectedWorkReturnDate = suspectSheet.Data.Last().ExpectedWorkReturnDate,
                        HealthMeasure = suspectSheet.Data.Last().HealthMeasure,
                        QuarantinePlace = suspectSheet.Data.Last().QuarantinePlace,
                        Link = new Link()
                        {
                            CaseNumber = link.CaseNumber,
                            Closed = true
                        }
                    };

                    this.newSuspectUpdate.Add(suspectCommand);

                    //RIAPERTURA DELLA SCHEDA POSITIVA GIA ESISTENTE
                    var positiveSheet = this.getPatientByCaseNumber.GetPatient(link.CaseNumber, this.getSessionContext.GetActiveGroup());

                    var positiveData = positiveSheet.Data.ToList();
                    var positiveQuarantinePlace = positiveData[positiveData.Count - 2].QuarantinePlace;

                    var positiveCommand = new NewPositiveUpdateCommand()
                    {
                        ActualWorkReturnDate = null,
                        CaseNumber = link.CaseNumber,
                        DiseaseConfirmDate = positiveSheet.Data.Last().DiseaseConfirmDate,
                        EstremiProvvedimentiASL = positiveSheet.Data.Last().EstremiProvvedimentiASL,
                        ExpectedWorkReturnDate = positiveSheet.Data.Last().ExpectedWorkReturnDate,
                        //QuarantinePlace = positiveQuarantinePlace,
                        QuarantinePlace = positiveQuarantinePlace,
                        Link = new Link()
                        {
                            CaseNumber = command.CaseNumber,
                            Closed = false
                        }
                    };

                    this.newPositiveUpdate.Add(positiveCommand);
                    command.PositiveSheetNum = positiveCommand.CaseNumber;
                }
            }

            else
            {
                if (command.Link != null)
                {
                    //PROCEDO CON IL SECONDO PASSO DELL'AGGIORNAMENTO PER UN POSITIVO INESISTENTE

                    var positiveSheet = this.getPatientByCaseNumber.GetPatient(command.Link.CaseNumber, this.getSessionContext.GetActiveGroup());
                    if (positiveSheet.Data.Last().Link != null)
                    {
                        //Eccezione - esiste già un link alla scheda sospetto
                    }

                    var actualWorkReturnDate = positiveSheet.Data.Last().ActualWorkReturnDate != null ? positiveSheet.Data.Last().ActualWorkReturnDate : null;
                    var expectedWorkReturnDate = positiveSheet.Data.Last().ExpectedWorkReturnDate != null ? positiveSheet.Data.Last().ExpectedWorkReturnDate : null;

                    //SCHEDA POSITIVO - LA PROPRIETA' LINK.CLOSED A TRUE E PASSO IL RIFERIMENTO ALLA SCHEDA SOSPETTO
                    var positiveCommand = new NewPositiveUpdateCommand()
                    {
                        ActualWorkReturnDate = actualWorkReturnDate,
                        ExpectedWorkReturnDate = expectedWorkReturnDate,
                        DiseaseConfirmDate = positiveSheet.Data.Last().DiseaseConfirmDate,
                        EstremiProvvedimentiASL = positiveSheet.Data.Last().EstremiProvvedimentiASL,
                        CaseNumber = command.Link.CaseNumber,
                        QuarantinePlace = positiveSheet.Data.Last().QuarantinePlace,
                        Link = new Link()
                        {
                            CaseNumber = command.CaseNumber,
                            Closed = true
                        }
                    };

                    //AGGIORNO LA SCHEDA SOSPETTO E LA CHIUDO
                    this.newPositiveUpdate.Add(positiveCommand);

                    //AGGIORNO I DATA DELLA SCHEDA SOSPETTO
                    this.newSuspectUpdate.Add(command);
                }
                else
                {
                    var suspectUpdateCheck = this.getSuspectByCaseNumber.GetSuspect(command.CaseNumber, this.getSessionContext.GetActiveGroup());
                    
                    if (suspectUpdateCheck.Closed)
                    {
                        throw new AtbApplicationException("Attenzione: stai tentando di modificare una scheda chiusa!");
                    }
                    //UPDATE SEMPLICE DEL SOSPETTO
                    /*
                     * Nel dto di input troverò ConvertToPositive = false
                     */
                    this.newSuspectUpdate.Add(command);
                }
             }
        }
    }
}