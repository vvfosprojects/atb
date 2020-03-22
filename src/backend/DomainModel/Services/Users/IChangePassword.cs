using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Services.Users
{
    public interface IChangePassword
    {
        void Change(string username, string newPwdHash);
    }
}