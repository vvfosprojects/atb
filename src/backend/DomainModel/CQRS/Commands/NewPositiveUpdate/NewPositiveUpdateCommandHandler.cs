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
                var link = positiveSheet.Data.Last().Link;

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
                    var positiveCommand = new NewPositiveUpdateCommand()
                    {
                        ActualWorkReturnDate = positiveSheet.Data.Last().ActualWorkReturnDate,
                        CaseNumber = command.CaseNumber,
                        ExpectedWorkReturnDate = positiveSheet.Data.Last().ExpectedWorkReturnDate.Value,
                        QuarantinePlace = positiveSheet.Data.Last().QuarantinePlace,
                        DiseaseConfirmDate = positiveSheet.Data.Last().DiseaseConfirmDate,
                        EstremiProvvedimentiASL = positiveSheet.Data.Last().EstremiProvvedimentiASL,
                        Link = new Link()
                        {
                            CaseNumber = positiveSheet.Data.Last().Link.CaseNumber,
                            Closed = true
                        }
                    };

                    this.newPositiveUpdate.Add(positiveCommand);

                    //RIAPERTURA DELLA SCHEDA POSITIVA GIA ESISTENTE
                    var suspectSheet = this.getSuspectByCaseNumber.GetSuspect(positiveSheet.Data.Last().Link.CaseNumber, this.getSessionContext.GetActiveGroup());

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

                    //SCHEDA SOSPETTO - LA PROPRIETA' LINK.CLOSED A TRUE E PASSO IL RIFERIMENTO ALLA SCHEDA POSITIVO
                    var suspectCommand = new NewSuspectUpdateCommand()
                    {
                        ActualWorkReturnDate = suspectSheet.Data.Last().ActualWorkReturnDate,
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


//se devo convertire un positivo in un sospetto
//if (command.ConvertToSuspect)
//{
//    var positiveSheet = this.getPatientByCaseNumber.GetPatient(command.CaseNumber, this.getSessionContext.GetActiveGroup());

//    var link = positiveSheet.Data.Where(x => x.Link != null).SingleOrDefault();

//    //check if link not already exists
//    if (link == null)
//    {
//        //if not exists
//        this.newPositiveUpdate.Add(command);
//        command.SuspectSheetNum = null;
//    }

//    //if already exists
//    else 
//    {
//        //chiudo la scheda positivo
//        this.newPositiveUpdate.Add(new NewPositiveUpdateCommand()
//        {
//            ActualWorkReturnDate = command.ActualWorkReturnDate,
//            DiseaseConfirmDate = command.DiseaseConfirmDate,
//            CaseNumber = command.CaseNumber,
//            EstremiProvvedimentiASL = command.EstremiProvvedimentiASL,
//            ExpectedWorkReturnDate = command.ExpectedWorkReturnDate,
//            QuarantinePlace = command.QuarantinePlace,
//            Link = new Link()
//            {
//                CaseNumber = positiveSheet.Data.Last().Link.CaseNumber,
//                Closed = true
//            }
//        });

//        //riapro la scheda paziente
//        var sheetSuspect = this.getSuspectByCaseNumber.GetSuspect(positiveSheet.Data.Last().Link.CaseNumber, this.getSessionContext.GetActiveGroup());
//        var suspectCommand = new NewSuspectUpdateCommand()
//        {
//            ActualWorkReturnDate = null,
//            CaseNumber = positiveSheet.Data.Last().Link.CaseNumber,
//            ExpectedWorkReturnDate = sheetSuspect.Data.Last().ExpectedWorkReturnDate,
//            HealthMeasure = sheetSuspect.Data.Last().HealthMeasure,
//            QuarantinePlace = sheetSuspect.Data.Last().QuarantinePlace,
//            Link = new Link()
//            {
//                CaseNumber = command.CaseNumber,
//                Closed = false
//            }
//        };
//        this.newSuspectUpdate.Add(suspectCommand);
//        command.SuspectSheetNum = positiveSheet.Data.Last().Link.CaseNumber;
//    }
//}

//if (command.Link != null)
//{
//    var sheetSuspect = this.getSuspectByCaseNumber.GetSuspect(command.Link.CaseNumber, this.getSessionContext.GetActiveGroup());

//    //check if already exist a link
//    var link = sheetSuspect.Data.Where(x => x.Link != null).SingleOrDefault();

//    //if link doesn't exists
//    if (link == null)
//    {
//        this.newPositiveUpdate.Add(command);

//        this.newSuspectUpdate.Add(new NewSuspectUpdateCommand()
//        {
//            CaseNumber = command.Link.CaseNumber,
//            Link = new Link()
//            {
//                CaseNumber = command.CaseNumber,
//                Closed = true
//            },
//            ActualWorkReturnDate = null,
//            QuarantinePlace = sheetSuspect.Data.Last().QuarantinePlace,
//            ExpectedWorkReturnDate = sheetSuspect.Data.Last().ExpectedWorkReturnDate,
//            HealthMeasure = new HealthMeasure
//            {
//                By = sheetSuspect.Data.Last().HealthMeasure.By,
//                Code = sheetSuspect.Data.Last().HealthMeasure.Code
//            }
//        });
//    }
//}

////caso base: (link = null e convertToSuspect = false)
//else
//{
//    this.newPositiveUpdate.Add(command);
//}