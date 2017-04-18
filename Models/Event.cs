using Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmazingRaceMVC.Models
{
    [Table("Event")]
    public class Event
    {
        public Guid Id { get; set; }
        public string EventName { get; set; }
        public DateTime EventDateTime { get; set; }
        public String City { get; set; }
        //[ForeignKey("EventId")]
        public ICollection<Pitstop> pitstops { get; set; }
    }
}