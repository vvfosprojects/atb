using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.CQRS.Commands.AddPatientCommand;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Commands.NewPositiveCase
{
    //public class NewPositiveCaseCommandAuthorizer : ICommandAuthorizer<NewPositiveCaseCommand>
    //{
    //    private readonly IGetSessionContext getSessionContext;

    //    public NewPositiveCaseCommandAuthorizer(IGetSessionContext getSessionContext)
    //    {
    //        this.getSessionContext = getSessionContext;
    //    }

    //    public IEnumerable<AuthorizationResult> Authorize(NewPositiveCaseCommand command)
    //    {
    //        if (getSessionContext.GetLoggedUsername.)
    //    }
    //}
}
