using AmazingRaceMVC.Models;
using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class EventRepository
    {
        //private AmazingRaceDBContext amazingDBcontext;
        private AmazingRaceDBContext amazingDBcontext = new AmazingRaceDBContext();

        public EventRepository()
        {

        }

        //public EventRepository(AmazingRaceDBContext context)
        //{
        //    amazingDBcontext = context;
        //}

        public IEnumerable<Event> GetAll()
        {
            return amazingDBcontext.Events.ToList();
        }

        public void Add(Event entity)
        {
            if (amazingDBcontext != null && amazingDBcontext.Events != null)
            {
                if (entity.Id == Guid.Empty) entity.Id = Guid.NewGuid();
                amazingDBcontext.Events.Add(entity);
                amazingDBcontext.SaveChanges();
            }
        }

        public void Remove(Guid id)
        {
            if (amazingDBcontext != null && amazingDBcontext.Events != null)
            {
                var obj = amazingDBcontext.Events.Find(id);
                amazingDBcontext.Events.Remove(obj);
                amazingDBcontext.SaveChanges();
            }
        }

        public Event GetById(Guid id)
        {
            return amazingDBcontext.Events.Find(id);
        }

        public void update(Event eventToUpdate)
        {
            amazingDBcontext.Entry(eventToUpdate).State = EntityState.Modified;
            amazingDBcontext.SaveChanges();
        }
    }
}
