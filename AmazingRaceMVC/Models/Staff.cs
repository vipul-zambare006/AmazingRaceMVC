using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AmazingRaceMVC.Models
{
    public class Staff
    {
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }


        static List<Staff> users = new List<Staff>()
        {
            new Staff() {UserName="admin",Role="Admin",Password="123" },
            new Staff() {UserName="team",Role="Team",Password="team" }
        };

        public Staff GetUserDetails(Staff user)
        {
            if (user != null)
                return users.Where(u => u.UserName.ToLower() == user.UserName.ToLower() && u.Password == user.Password).FirstOrDefault();
            else
                return null;      
        }
    }
}