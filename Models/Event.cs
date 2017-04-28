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
        public Event()
        {
            Pitstops = new List<Pitstop>();
            Teams = new List<Team>();
        }

        public Guid Id { get; set; }

        [Required(ErrorMessage = "Please enter event name.")]
        public string EventName { get; set; }
        
        [Required(ErrorMessage = "Please enter event date.")]
        public DateTime EventDateTime { get; set; }

        [Required(ErrorMessage = "Please enter city name.")]
        public String City { get; set; }
        
        public virtual ICollection<Pitstop> Pitstops { get; set; }

        public virtual ICollection<Team> Teams { get; set; }
    }
}