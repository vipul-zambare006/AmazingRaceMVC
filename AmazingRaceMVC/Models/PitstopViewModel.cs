using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AmazingRaceMVC.Models
{
    public class PitstopViewModel
    {
        public Guid Id { get; set; }
        public string Location { get; set; }
        public int Order { get; set; }

    }
}