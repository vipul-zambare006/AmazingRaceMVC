using System;
using System.Web.Mvc;
using BusinessLayer;
using AmazingRaceMVC.Models;
using Models;
using System.Collections.Generic;

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
        public JsonResult Save(string id)
        {
            var status = false;
            var eventModel = new Event();
            if (!string.IsNullOrEmpty(id))
            {
                eventModel = _eventRepository.GetById(Guid.Parse(id));
                if (eventModel != null)
                {
                    status = true;
                }
            }
            else
            {
                status = false;
            }
            return Json(new { status = status, eventModelJson = eventModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Save(Event raceEvent, List<string> latlngArray)
        {
            if (latlngArray != null)
            {
                List<Pitstop> pitstops = new List<Pitstop>();
                foreach (var item in latlngArray)
                {
                    var testArray = item.Split('_');
                    pitstops.Add(new Pitstop
                    {
                        Id = Guid.NewGuid(),
                        Location = testArray[0],
                        Order = Convert.ToInt32(testArray[1]),
                        Name = "test name",
                        Clue = "Tst clue"
                    });
                }

            }

            bool status = false;
            string msg = "";
            try
            {
                //if (ModelState.IsValid)
                //{
                    if (raceEvent != null)
                    {
                        if (raceEvent.Id != Guid.Empty)
                        {
                            var objEvent = _eventRepository.GetById(raceEvent.Id);

                            if (objEvent != null)
                            {
                                objEvent.EventName = raceEvent.EventName;
                                objEvent.EventDateTime = raceEvent.EventDateTime;
                                objEvent.City = raceEvent.City;
                                //v.pitstops = raceEvent.pitstops;
                                status = true;
                                _eventRepository.update(objEvent);
                            }
                        }
                        else
                        {
                            _eventRepository.Add(raceEvent);
                            status = true;
                        }
                        return new JsonResult { Data = new { status = status, msg = msg } };
                    }
                //}
            }
            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }
            return new JsonResult { Data = new { status = status, msg = msg } };
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