using System.Web.Mvc;
using BusinessLayer;
using System.Linq;
using AmazingRaceMVC.Models;
using System;

namespace AmazingRaceMVC.Controllers
{
    public class EventController : Controller
    {
        EventManagement em = new EventManagement();
        // GET: Event
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getEvents()
        {
          

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

        [HttpPost]
        public string Create([Bind(Exclude = "Id")] Event eventModel)
        {
           // ApplicationDbContext db = new ApplicationDbContext();
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    eventModel.Id = Guid.NewGuid();
                    em.AddEvent(eventModel);

                    msg = "Saved Successfully";
                }
                else
                {
                    msg = "Validation data not successfully";
                }
            }
            catch (Exception ex)
            {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        public string Edit(Event eventModel)
        {
           
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    em.Update(eventModel);
                    msg = "Saved Successfully";
                }
                else
                {
                    msg = "Validation data not successfully";
                }
            }
            catch (Exception ex)
            {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        public string Delete(string Id)
        {
            em.Remove(Guid.Parse(Id));
            return "Deleted successfully";
        }

    }
}