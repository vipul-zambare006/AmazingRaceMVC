using Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AmazingRaceMVC.Models
{
    [Table("Event")]
    public class Event
    {
        public Guid Id { get; set; }

        [Required]
        public string EventName { get; set; }
        [Required]
        public DateTime EventDateTime { get; set; }
        [Required]
        public String City { get; set; }
        //[ForeignKey("EventId")]
        public ICollection<Pitstop> pitstops { get; set; }
    }
}