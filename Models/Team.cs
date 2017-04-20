using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations.Schema;
using AmazingRaceMVC.Models;
using System.Web;

namespace Models
{
    [Table("Team")]
    public class Team
    {
        public Guid ID { get; set; }
        public String Name { get; set; }
        //public HttpPostedFileWrapper ImageFile { get; set; }
        public virtual Event Event_ID { get; set; }
    }
}

