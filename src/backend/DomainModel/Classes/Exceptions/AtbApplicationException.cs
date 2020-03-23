using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Classes.Exceptions
{
    public class AtbApplicationException : Exception
    {
        public AtbApplicationException()
        {
        }

        public AtbApplicationException(string message)
            : base(message)
        {
        }

        public AtbApplicationException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}