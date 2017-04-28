using AmazingRaceMVC.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Pitstop
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string Location { get; set; }
        // public string Name { get; set; }
        //public string  Clue { get; set; }

        public Guid EventId { get; set; }

        [ForeignKey("EventId")]
        public virtual Event Event { get; set; }
    }
}
