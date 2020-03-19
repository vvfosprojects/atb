using DomainModel.CQRS.Commands.NewSuspectUpdate;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Services
{
    public interface INewSuspectUpdate
    {
        void Add(NewSuspectUpdateCommand command);
    }
}
