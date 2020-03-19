using DomainModel.Services.Users;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace JwtStuff
{
    internal class GetLoggedUser : IGetLoggedUser
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public GetLoggedUser(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        public string Get()
        {
            var identity = this.httpContextAccessor.HttpContext.User.Identity;

            if (identity.IsAuthenticated)
                return identity.Name;
            else
                return null;
        }
    }
}