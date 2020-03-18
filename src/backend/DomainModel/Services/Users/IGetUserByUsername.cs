using DomainModel.Classes;
using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Services.Users
{
    /// <summary>
    /// Return the enabled user by his username.
    /// </summary>
    public interface IGetUserByUsername
    {
        User Get(string username);
    }
}