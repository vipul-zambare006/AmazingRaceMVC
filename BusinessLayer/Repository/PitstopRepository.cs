using DataAccessLayer;
using Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace BusinessLayer.Repository
{
    public class PitstopRepository
    {
        private AmazingRaceDBContext amazingRacecontext = new AmazingRaceDBContext();
        public PitstopRepository()
        {
            
        }

        public IEnumerable<Pitstop> GetByEventId(Guid eventId)
        {
            return null;
            //return amazingRacecontext.Pits
        }

        public void Add(Pitstop entity)
        {
            if (amazingRacecontext != null && amazingRacecontext.Pitstops != null)
            {
                if (entity.Id == Guid.Empty) entity.Id = Guid.NewGuid();
                amazingRacecontext.Pitstops.Add(entity);
                amazingRacecontext.SaveChanges();
            }
        }

        public void Remove(Guid id)
        {
            if (amazingRacecontext != null && amazingRacecontext.Pitstops != null)
            {
                var obj = amazingRacecontext.Pitstops.Find(id);
                amazingRacecontext.Pitstops.Remove(obj);
                amazingRacecontext.SaveChanges();
            }
        }

        public Pitstop GetById(Guid id)
        {
            return amazingRacecontext.Pitstops.Find(id);
        }

        public void Update(Pitstop pitstopToUpdate)
        {
            amazingRacecontext.Entry(pitstopToUpdate).State = EntityState.Modified;
            amazingRacecontext.SaveChanges();
        }
    }
}
