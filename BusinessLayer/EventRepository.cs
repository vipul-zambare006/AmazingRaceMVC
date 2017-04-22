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
        private AmazingRaceDBContext context = new AmazingRaceDBContext();
        public EventRepository()
        {

        }

        public IEnumerable<Event> GetAll()
        {
            return context.Events.ToList();
        }

        public void Add(Event entity)
        {
            if (context != null && context.Events != null)
            {
                if (entity.Id == Guid.Empty) entity.Id = Guid.NewGuid();
                context.Events.Add(entity);
                context.SaveChanges();
            }
        }

        public void Remove(Guid id)
        {
            if (context != null && context.Events != null)
            {
                var obj = context.Events.Find(id);
                context.Events.Remove(obj);
                context.SaveChanges();
            }
        }

        public Event GetById(Guid id)
        {
            return context.Events.Find(id);
        }

        public void update(Event eventToUpdate)
        {
            context.Entry(eventToUpdate).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
}
