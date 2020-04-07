using CQRS.Commands;
using DomainModel.Services;
using DomainModel.Services.Users;
using System.Linq;

namespace DomainModel.CQRS.Commands.NewSuspectUpdate
{
    public class NewSuspectUpdateCommandHandler : ICommandHandler<NewSuspectUpdateCommand>
    {
        private readonly INewSuspectUpdate newSuspectUpdate;
        private readonly IGetSuspectByCaseNumber getSuspectByCaseNumber;
        private readonly IGetSessionContext getSessionContext;
        public NewSuspectUpdateCommandHandler(INewSuspectUpdate newSuspectUpdate, IGetSuspectByCaseNumber getSuspectByCaseNumber, IGetSessionContext getSessionContext)
        {
            this.newSuspectUpdate = newSuspectUpdate;
            this.getSuspectByCaseNumber = getSuspectByCaseNumber;
            this.getSessionContext = getSessionContext;
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

                //altrimenti 
                else 
                {
                    
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
