using AmazingRaceMVC.Models;
using DataAccessLayer;
using Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace BusinessLayer
{
    public class EventRepository
    {
        private AmazingRaceDBContext amazingDBcontext = new AmazingRaceDBContext();

        public EventRepository()
        {

        }

        public IEnumerable<Event> GetAll()
        {
            return amazingDBcontext.Events.Include(x => x.Pitstops).ToList();
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

        public void DeleteAllPitstop(Guid eventId)
        {
            if (amazingDBcontext != null && amazingDBcontext.Events != null)
            {
                var eventObj = GetById(eventId);
                amazingDBcontext.Pitstops.RemoveRange(amazingDBcontext.Pitstops.Where(x => x.EventId == eventId));
                amazingDBcontext.SaveChanges();
            }
        }

        public Event GetById(Guid id)
        {
            //return amazingDBcontext.Events.Find(id);
            return amazingDBcontext.Events
                        .Include(x => x.Pitstops)
                        .Where(y => y.Id == id)
                        .FirstOrDefault();
        }

        public void update(Event eventToUpdate)
        {
            amazingDBcontext.Entry(eventToUpdate).State = EntityState.Modified;
            amazingDBcontext.SaveChanges();
        }

        public void AddPitstops(List<Pitstop> pitstops)
        {
            amazingDBcontext.Pitstops.AddRange(pitstops);
        }
        public void Save()
        {
            amazingDBcontext.SaveChanges();
        }
    }
}
