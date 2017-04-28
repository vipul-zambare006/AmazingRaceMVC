using System;
using System.Web;

namespace AmazingRaceMVC.Models
{
    public class TeamViewModel
    {
        public Guid ID { get; set; }
        public String Name { get; set; }
        public String ImagePath { get; set; }
        public string Event_ID { get; set; }
        public HttpPostedFileWrapper ImageFile { get; set; }
    }
}