using System;

namespace DomainModel.CQRS.Commands.KeepAlive
{
    public class KeepAliveCommand
    {
        public DateTime Data { get; set; }

        public string Group { get; set; }

        public string Utente { get; set; }
    }
}
