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

            public IList<Event> GetAll()
            {
                return context.Events.ToList();
            }

            public void Add(Event entity)
            {
                context.Events.Add(entity);
                context.SaveChanges();
            }

            public void Remove(Event entity)
            {
                var obj = context.Events.Find(entity.Id);
                context.Events.Remove(obj);
                context.SaveChanges();
            }

            public Event GetById(Guid id)
            {
                return context.Events.Find(id);
            }

        public void update (Event eventToUpdate)
        {
            context.Entry(eventToUpdate).State = EntityState.Modified;
            context.SaveChanges();
        }
    }
    }
