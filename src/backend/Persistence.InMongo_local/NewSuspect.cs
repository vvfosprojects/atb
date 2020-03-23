using DomainModel.Classes;
using DomainModel.Classes.Exceptions;
using DomainModel.CQRS.Commands.NewSuspectCommand;
using DomainModel.Services;
using DomainModel.Services.Users;

namespace Persistence.InMongo_local
{
    public class NewSuspect : INewSuspect
    {
        private readonly DbContext dbContext;
        private readonly ICryptools cryptools;
        private readonly IGetSessionContext getSessionContext;

        public NewSuspect(DbContext dbContext, ICryptools cryptools, IGetSessionContext getSessionContext)
        {
            this.dbContext = dbContext;
            this.getSessionContext = getSessionContext;
            this.cryptools = cryptools;
        }

        public void Add(NewSuspectCommand command)
        {
            Suspect suspect = new Suspect()
            {
                Subject = new Anagrafica()
                {
                    Nome = cryptools.Encrypt(command.Name),
                    Cognome = cryptools.Encrypt(command.Surname),
                    Email = cryptools.Encrypt(command.Email),
                    Number = command.Number,
                    Phone = cryptools.Encrypt(command.Phone),
                    Role = cryptools.Encrypt(command.Role)
                },
                Group = getSessionContext.GetActiveGroup(),
            };

            try
            {
                dbContext.Suspects.InsertOne(suspect);
            }
            catch
            {
                throw new AtbApplicationException("Inserimento fallito. Numero del caso già esistente?.");
            }
        }
    }
}