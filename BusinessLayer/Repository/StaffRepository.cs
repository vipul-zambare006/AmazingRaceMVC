using DataAccessLayer;
using Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class StaffRepository
    {
        private AmazingRaceDBContext context = new AmazingRaceDBContext();
        public StaffRepository()
        {

        }

        public IList<Staff> GetAll()
        {
            return context.Staffs.OrderBy(a => a.Name).ToList();
        }

        public Staff GetByID(Guid ID)
        {
            return context.Staffs.Find(ID);
        }

        public void Add(Staff entity)
        {
            if (context != null && context.Staffs != null)
            {
                if (entity.ID == Guid.Empty)
                { 
                    entity.ID = Guid.NewGuid();
                    context.Staffs.Add(entity);
                    context.SaveChanges();
                }
            }
        }

        public void Update(Staff entity)
        {
            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
            
        }

        public void Remove(Guid ID)
        {
            if (context != null && context.Staffs != null)
            {
                var obj = context.Staffs.Find(ID);
                context.Staffs.Remove(obj);
                context.SaveChanges();
            }
        }


        //        static List<User> users = new List<User>() {

        //    new User() {Email="abc@gmail.com",Roles="Admin,Editor",Password="abcadmin" },
        //    new User() {Email="xyz@gmail.com",Roles="Editor",Password="xyzeditor" }
        //};

        //        public static User GetUserDetails(User user)
        //        {
        //            return users.Where(u => u.Email.ToLower() == user.Email.ToLower() &&
        //            u.Password == user.Password).FirstOrDefault();
        //        }
        //    }
    }

}