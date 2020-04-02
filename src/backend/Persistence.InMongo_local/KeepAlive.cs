using DomainModel.CQRS.Commands.KeepAlive;
using DomainModel.Services;
using System;

namespace Persistence.InMongo_local
{
    internal class KeepAliveInsert : IKeepAlive
    {
        private readonly DbContext dbContext;
        public KeepAliveInsert(DbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public void Insert(KeepAliveCommand command)
        {
            var keepAlive = new KeepAlive()
            {
                Data = command.Data,
                Utente = command.Utente,
                Group = command.Group
            };
            this.dbContext.KeepAlives.InsertOne(keepAlive);
        }
    }
}
