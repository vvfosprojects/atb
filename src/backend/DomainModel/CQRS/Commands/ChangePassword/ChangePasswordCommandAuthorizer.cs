using CQRS.Authorization;
using CQRS.Commands.Authorizers;
using DomainModel.Services;
using DomainModel.Services.Users;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DomainModel.CQRS.Commands.ChangePassword
{
    public class ChangePasswordCommandAuthorizer : ICommandAuthorizer<ChangePasswordCommand>
    {
        private readonly IGetSessionContext getSessionContext;
        private readonly IGetUserByUsername getUserByUsername;

        public ChangePasswordCommandAuthorizer(IGetSessionContext getSessionContext, IGetUserByUsername getUserByUsername)
        {
            this.getSessionContext = getSessionContext ?? throw new ArgumentNullException(nameof(getSessionContext));
            this.getUserByUsername = getUserByUsername ?? throw new ArgumentNullException(nameof(getUserByUsername));
        }

        public IEnumerable<AuthorizationResult> Authorize(ChangePasswordCommand command)
        {
            // Admin user is authorized
            if (getSessionContext.LoggedUserIsAdmin())
                yield break;

            // Anonymous user is not allowed
            if (!getSessionContext.IsLogged())
            {
                yield return new AuthorizationResult("User must be logged.");
                yield break;
            }

            var loggedUsername = this.getSessionContext.GetLoggedUsername();

            if (loggedUsername != command.Username)
            {
                Log.Warning("Attack! Someone is trying to change someone other's password.");
                yield return new AuthorizationResult("Non sei autorizzato a cambiare troppe password! :-o");
            }

            var user = this.getUserByUsername.Get(loggedUsername);
            var oldPwdHash = ShaGenerator.ComputeSha256Hash(command.OldPassword);
            if (user.PwdHash != oldPwdHash)
                yield return new AuthorizationResult("La vecchia password è invalida.");
        }
    }
}