using DomainModel.Services.Users;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;

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
                return user.Claims.Single(c => c.Type.ToLower().EndsWith("group")).Value;
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
    }
}