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

        /// <summary>
        /// Tells if the logged user is a doctor.
        /// </summary>
        /// <returns>True if he is a doctor</returns>
        bool LoggedUserIsDoctor();

        /// <summary>
        /// Tells if the logged user is a manager.
        /// </summary>
        /// <returns>True if he is a manager</returns>
        bool LoggedUserIsManager();

        /// <summary>
        /// Tells if the logged user is an admin.
        /// </summary>
        /// <returns>True if he is an admin</returns>
        bool LoggedUserIsAdmin();

        /// <summary>
        /// Tells if the logged user is an supervisor.
        /// </summary>
        /// <returns>True if he is an supervisor</returns>
        bool LoggedUserIsSupervisor();

        /// <summary>
        /// Tells if there is a logged user.
        /// </summary>
        /// <returns>True is there is a logged user. False otherwise.</returns>
        bool IsLogged();
    }
}