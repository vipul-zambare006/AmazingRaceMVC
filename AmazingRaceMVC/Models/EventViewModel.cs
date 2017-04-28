using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AmazingRaceMVC.Models
{
    public class EventViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime EventDate { get; set; }
        public string City { get; set; }

    }
}