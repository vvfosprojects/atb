using System;
using System.Collections.Generic;
using System.Text;
using DomainModel.Classes;

namespace DomainModel.Services.Users
{
    public class GetUserByUsername_Fake : IGetUserByUsername
    {
        public User Get(string username)
        {
            return new User()
            {
                Username = "mario.rossi",
                PwdHash = "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae", // sha("foo")
                Group = "Catania",
                Enabled = true,
                Roles = new List<string>() { "doctor" },
            };
        }
    }
}