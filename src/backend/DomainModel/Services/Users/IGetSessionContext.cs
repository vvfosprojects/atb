using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Services.Users
{
    /// <summary>
    /// Returns the username of the logged user, if any.
    /// </summary>
    public interface IGetSessionContext
    {
        /// <summary>
        /// Returns the username of the logged user
        /// </summary>
        /// <returns>The username of the logged user. Null in case of anonymous users.</returns>
        string GetLoggedUsername();

        /// <summary>
        /// Returns the active group bound to the logged user
        /// </summary>
        /// <returns>The active group bound to the logged user. Null in case of anonymous users.</returns>
        string GetActiveGroup();
    }
}