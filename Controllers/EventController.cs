using System.Web.Mvc;
using BusinessLayer;
using System.Linq;

namespace AmazingRaceMVC.Controllers
{
    public class EventController : Controller
    {
        // GET: Event
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getEvents()
        {
            EventManagement em = new EventManagement();

            var jsonData = new
            {
                total = 1,
                page = 1,
                records = em.GetAllEvents().Count,

                rows = (
                 from ev in em.GetAllEvents().ToList()
                 select new
                 {
                     id = ev.Id,
                     cell = new string[] {
                      ev.EventName.ToString(),
                      ev.EventDateTime.ToString(),
                      ev.City.ToString(),
                      }
                 }).ToArray()
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);

            //List<Event> evList = em.GetAllEvents();
            //return View(evList);
        }
    }
}