using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Commands.KeepAlive
{
    public class KeepAlive
    {
        public string Id { get; set; }

        public DateTime Data { get; set; }

        public string Group { get; set; }

        public string Utente { get; set; }
    }
}
