using DomainModel.CQRS.Commands.NewPositiveUpdate;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Services
{
    public interface INewPositiveUpdate
    {
        void Add(NewPositiveUpdateCommand command);
    }
}
