using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Services.Users
{
    /// <summary>
    /// Returns the username of the logged user, if any.
    /// </summary>
    public interface IGetLoggedUser
    {
        /// <summary>
        /// Returns the username of the logged user
        /// </summary>
        /// <returns>The username of the logged user. Null in case of anonymous users.</returns>
        string Get();
    }
}