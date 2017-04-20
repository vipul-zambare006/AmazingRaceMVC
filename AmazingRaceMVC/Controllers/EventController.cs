using System.Web.Mvc;
using BusinessLayer;
using System.Linq;
using AmazingRaceMVC.Models;
using System;

namespace AmazingRaceMVC.Controllers
{
    [Authorize]
    public class EventController : Controller
    {
        EventRepository _eventRepository = new EventRepository();

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetEvents()
        {
            var raceEvents = _eventRepository.GetAll();
            return Json(new { data = raceEvents }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Save(string id)
        {
            if(!string.IsNullOrEmpty(id))
            {
                var v = _eventRepository.GetById(Guid.Parse(id));
                return View(v);
            }
            return View();
        }

        [HttpPost]
        public ActionResult Save(Event raceEvent)
        {
            bool status = false;
            //Validation
            if (ModelState.IsValid)
            {
                if (raceEvent != null)
                {
                    var v = _eventRepository.GetById(raceEvent.Id);

                    if (v != null)
                    {
                        v.EventName = raceEvent.EventName;
                        v.EventDateTime = raceEvent.EventDateTime;
                        v.City = raceEvent.City;
                        //v.pitstops = raceEvent.pitstops;
                    }
                    else
                    {
                        _eventRepository.Add(raceEvent);
                    }
                }
            }
            return new JsonResult { Data = new { status = status } };
        }

        [HttpGet]
        public ActionResult Delete(Guid id)
        {
            var v = _eventRepository.GetById(id);
            return View(v);
        }

        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteEmp(Guid id)
        {
            _eventRepository.Remove(id);
            return new JsonResult { Data = new { status = true } };
        }
    }
}