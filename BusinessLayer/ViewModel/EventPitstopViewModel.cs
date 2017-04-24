using AmazingRaceMVC.Models;
using Models;
using System.Collections.Generic;

namespace BusinessLayer.ViewModel
{
    public class EventPitstopViewModel
    {
        public Event RaceEvent { get; set; }
        public ICollection<Pitstop> Pitstops { get; set; }
    }
}
