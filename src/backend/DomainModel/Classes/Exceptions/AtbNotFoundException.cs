using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Classes.Exceptions
{
    public class AtbNotFoundException : Exception
    {
        public AtbNotFoundException()
        {
        }

        public AtbNotFoundException(string message)
            : base(message)
        {
        }

        public AtbNotFoundException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}