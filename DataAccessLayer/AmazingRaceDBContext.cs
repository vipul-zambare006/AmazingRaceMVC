using AmazingRaceMVC.Models;
using Models;
using System.Data.Entity;

namespace DataAccessLayer
{
    public class AmazingRaceDBContext : DbContext
    {
        public AmazingRaceDBContext() : base("DefaultConnection")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Pitstop> Pitstops { get; set; }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Staff> Staffs { get; set; }
    }
}
