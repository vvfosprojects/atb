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

                    //inietto i vecchi dati
                    var oldPositive = this.getPatientByCaseNumber.GetPatient(link.Link.CaseNumber, this.getSessionContext.GetActiveGroup());

                    var positiveCommand = new NewPositiveUpdateCommand()
                    {
                        ActualWorkReturnDate = null,
                        EstremiProvvedimentiASL = oldPositive.Data.Last().EstremiProvvedimentiASL,
                        ExpectedWorkReturnDate = oldPositive.Data.Last().ExpectedWorkReturnDate,
                        QuarantinePlace = oldPositive.Data.Last().QuarantinePlace,
                        CaseNumber = link.Link.CaseNumber,
                        DiseaseConfirmDate = oldPositive.Data.Last().DiseaseConfirmDate,
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

            if (command.Link != null)
            {
                var patient = this.getPatientByCaseNumber.GetPatient(command.Link.CaseNumber, this.getSessionContext.GetActiveGroup());
                var link = patient.Data.Last().Link;
                //check if link already exists
                if (link != null)
                {
                    //eccezione
                }

                var positiveCommand = new NewPositiveUpdateCommand()
                {
                    CaseNumber = command.Link.CaseNumber,
                    ActualWorkReturnDate = patient.Data.Last().ActualWorkReturnDate,
                    DiseaseConfirmDate = patient.Data.Last().DiseaseConfirmDate,
                    EstremiProvvedimentiASL = patient.Data.Last().EstremiProvvedimentiASL,
                    QuarantinePlace = patient.Data.Last().QuarantinePlace,
                    ExpectedWorkReturnDate = patient.Data.Last().ExpectedWorkReturnDate,
                    Link = command.Link
                };
                
                //aggiorno il positivo settando il Link al nuovo caso sospetto e chiudendo la scheda positivo
                this.newPositiveUpdate.Add(positiveCommand);

                //insertisco il sospetto con il link alla vecchia scheda positiva
                var suspectCommand = new NewSuspectUpdateCommand()
                {
                    CaseNumber = command.CaseNumber,
                    ActualWorkReturnDate = command.ActualWorkReturnDate,
                    ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
                    HealthMeasure = command.HealthMeasure,
                    QuarantinePlace = command.QuarantinePlace,
                    Link = new Link()
                    {
                        CaseNumber = patient.Subject.Number,
                        Closed = false
                    }
                };
                this.newSuspectUpdate.Add(suspectCommand);
            }

            //altrimenti procedo normalmente
            else
            {
                this.newSuspectUpdate.Add(command);
            }
        }
    }
}
