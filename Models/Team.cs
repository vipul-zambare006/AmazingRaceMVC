using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;
using AmazingRaceMVC.Models;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    [Table("Team")]
    public class Team
    {
        public Guid ID { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Team Name is required")]
        public String Name { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Team Photo is required")]
        public String ImagePath { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Enroll an event")]
        public Guid EventId { get; set; }

        [ForeignKey("EventId")]
        public virtual Event Event { get; set; }
    }
}

