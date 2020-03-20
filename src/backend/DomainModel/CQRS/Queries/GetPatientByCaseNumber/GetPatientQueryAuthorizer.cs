﻿using CQRS.Authorization;
using CQRS.Queries.Authorizers;
using DomainModel.CQRS.Queries.GetPatient;
using DomainModel.Services.Users;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.CQRS.Queries.GetPatientByCaseNumber
{
    public class GetPatientQueryAuthorizer : IQueryAuthorizer<GetPatientQuery,GetPatientQueryResult>
    {
        private readonly IGetSessionContext getSessionContext;

        public GetPatientQueryAuthorizer(IGetSessionContext getSessionContext)
        {
            this.getSessionContext = getSessionContext;
        }

        public IEnumerable<AuthorizationResult> Authorize(GetPatientQuery query)
        {
            if (!getSessionContext.LoggedUserIsDoctor())
                yield return new AuthorizationResult("Unauthorized");
        }
    }
}
