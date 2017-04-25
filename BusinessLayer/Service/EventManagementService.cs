using BusinessLayer.Repository;
using BusinessLayer.ViewModel;
using DataAccessLayer;
using System;

namespace BusinessLayer.Service
{
    public class EventManagementService
    {
        private PitstopRepository _pitstopRepository;
        private EventRepository _eventRepository;
        private AmazingRaceDBContext amazingRacecontext = new AmazingRaceDBContext();

        public bool AddEvent(EventPitstopViewModel eventPitstopViewModel)
        {
            var newEventId = Guid.NewGuid();
            eventPitstopViewModel.RaceEvent.Id = newEventId;

           _pitstopRepository = new PitstopRepository(amazingRacecontext);

            _eventRepository.Add(eventPitstopViewModel.RaceEvent);

            foreach (var pitstop in eventPitstopViewModel.Pitstops)
            {
                _pitstopRepository.Add(pitstop);
            }

            return true;
        }    

    }
}
