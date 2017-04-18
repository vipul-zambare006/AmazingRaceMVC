using AmazingRaceMVC.Models;
using Models;
using System.Data.Entity;

namespace DataAccessLayer
{
    public class AmazingRaceDBContext : DbContext
    {
        public AmazingRaceDBContext() : base("DefaultConnection")
        {

        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Pitstop> Pitstops { get; set; } 
    }
}
