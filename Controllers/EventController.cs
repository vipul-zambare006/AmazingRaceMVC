using System.Web.Mvc;
using BusinessLayer;
using System.Collections.Generic;
using AmazingRaceMVC.Models;

namespace AmazingRaceMVC.Controllers
{
    public class EventController : Controller
    {
        // GET: Event
        public ActionResult Index()
        {
            EventManagement em = new EventManagement();
            List<Event> evList = em.GetAllEvents();
            return View(evList);
        }
    }
}