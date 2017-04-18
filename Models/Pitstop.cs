using AmazingRaceMVC.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Pitstop
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Location { get; set; }
        public string Name { get; set; }
        public string  Clue { get; set; }

        //[ForeignKey("EventId")]
        public virtual Event EventId { get; set; }
    }
}
