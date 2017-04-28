
using AmazingRaceMVC.Models;
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
    public class TeamRepository
    {
        private AmazingRaceDBContext context = new AmazingRaceDBContext();
        private EventRepository _eventRepo = new EventRepository();
        public TeamRepository()
        {

        }

        public IList<Team> GetAll()
        {
            return context.Teams.OrderBy(a => a.Name).ToList();
        }

        public Team GetByID(Guid ID)
        {
            return context.Teams
                .Include(x => x.Event)
                .Where(y => y.ID == ID)
                .FirstOrDefault();
        }

        public void Add(TeamViewModel teamViewModel)
        {
            var eventObj = new Event();
            if (context != null && context.Teams != null)
            {
                if(teamViewModel.ID == Guid.Empty)
                {
                    if (!string.IsNullOrEmpty(teamViewModel.Event_ID))
                        eventObj = _eventRepo.GetById(Guid.Parse(teamViewModel.Event_ID));

                    var teamEntity = new Team()
                    {
                        ID = Guid.NewGuid(),
                        EventId = Guid.Parse(teamViewModel.Event_ID),
                        //Event_ID = eventObj,
                        ImagePath = teamViewModel.ImagePath,
                        Name = teamViewModel.Name
                    };

                    context.Teams.Add(teamEntity);
                    context.SaveChanges();
                }
            }               
        }

        public void Remove(Guid ID)
        {
            if (context != null && context.Teams != null)
            { 
                var obj = context.Teams.Find(ID);
                context.Teams.Remove(obj);
                context.SaveChanges();
            }

        }

        public void Update(Team entity)
        {
            context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();
        }

    }
}
