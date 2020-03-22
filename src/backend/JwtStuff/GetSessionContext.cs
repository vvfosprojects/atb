using DomainModel.Services.Users;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Security.Claims;

namespace JwtStuff
{
    internal class GetSessionContext : IGetSessionContext
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public GetSessionContext(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public string GetActiveGroup()
        {
            var user = this.httpContextAccessor.HttpContext.User;

            if (user.Identity.IsAuthenticated)
                return user.Claims.Single(c => c.Type == "atbGroup").Value;
            else
                return null;
        }

        public string GetLoggedUsername()
        {
            var identity = this.httpContextAccessor.HttpContext.User.Identity;

            if (identity.IsAuthenticated)
                return identity.Name;
            else
                return null;
        }

        public bool IsLogged()
        {
            var user = this.httpContextAccessor.HttpContext.User;

            return user.Identity.IsAuthenticated;
        }

        public bool LoggedUserIsAdmin()
        {
            var user = this.httpContextAccessor.HttpContext.User;

            if (user.Identity.IsAuthenticated)
            {
                return user.Claims
                    .Where(c => c.Type == "atbRoles")
                    .Any(r => r.Value == "admin");
            }
            else
                return false;
        }

        public bool LoggedUserIsDoctor()
        {
            var user = this.httpContextAccessor.HttpContext.User;

            if (user.Identity.IsAuthenticated)
            {
                return user.Claims
                    .Where(c => c.Type == "atbRoles")
                    .Any(r => r.Value == "doctor");
            }
            else
                return false;
        }

        public bool LoggedUserIsManager()
        {
            var user = this.httpContextAccessor.HttpContext.User;

            if (user.Identity.IsAuthenticated)
            {
                return user.Claims
                    .Where(c => c.Type == "atbRoles")
                    .Any(r => r.Value == "manager");
            }
            else
                return false;
        }
    }
}