using System;
using System.Collections.Generic;
using System.Text;

namespace DomainModel.Classes
{
    public class User
    {
        public User()
        {
            this.Roles = new List<string>();
        }

        public string Username { get; set; }
        public string PwdHash { get; set; }
        public string Group { get; set; }
        public bool Enabled { get; set; }
        public IList<string> Roles { get; set; }
    }
}