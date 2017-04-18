using AmazingRaceMVC.Models;
using System;
using System.Collections.Generic;

namespace BusinessLayer
{
    public class EventManagement
    {
        //The Dependency Injection of the IRepository<TEnt, in TPk>
        private EventRepository _eventRepository = new EventRepository();
        public EventManagement()
        {

        }

        public bool AddEvent(Event eventModel)
        {
            _eventRepository.Add(new Event
            {
                Id = Guid.NewGuid(),
                EventName = eventModel.EventName,
                City = eventModel.City,
                EventDateTime = eventModel.EventDateTime
            }
            );
            return true;
        }

        public bool Update(Event eventModel)
        {
            _eventRepository.update(eventModel);
            return true;
        }


        public List<Event> GetAllEvents()
        {
            List<Event> emList = new List<Event>();
            IEnumerable<Event> evList = _eventRepository.GetAll();

            foreach (var item in evList)
            {
                Event em = new Event
                {
                    EventName = item.EventName,
                    EventDateTime = item.EventDateTime,
                    City = item.City
                };
                emList.Add(em);
            }
            return emList;
        }

        public bool Remove(Guid Id)
        {
            Event eventModel = _eventRepository.GetById(Id);
            _eventRepository.Remove(eventModel);
            return true;
        }

    }
}
