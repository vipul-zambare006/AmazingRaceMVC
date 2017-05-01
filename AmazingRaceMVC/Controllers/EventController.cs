using System;
using System.Web.Mvc;
using BusinessLayer;
using AmazingRaceMVC.Models;
using Models;
using System.Collections.Generic;
using System.Linq;

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
            var eventJson = new List<EventViewModel>();
            try
            {
                foreach (var item in raceEvents)
                {
                    eventJson.Add(new EventViewModel
                    {
                        Id = item.Id,
                        Name = item.EventName,
                        EventDate = item.EventDateTime,
                        City = item.City
                    });
                }
                return Json(new { data = eventJson }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult Save(string id)
        {
            var status = false;
            var eventModel = new EventViewModel();
            try
            {
                if (!string.IsNullOrEmpty(id))
                {
                    var eventObj = _eventRepository.GetById(Guid.Parse(id));
                    if (eventObj != null)
                    {
                        eventModel = new EventViewModel
                        {
                            Id = eventObj.Id,
                            Name = eventObj.EventName,
                            EventDate = eventObj.EventDateTime,
                            City = eventObj.City
                        };
                        status = true;
                    }
                }
                else
                {
                    status = false;
                }
                return Json(new { status = status, eventModelJson = eventModel }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = status, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult Save(Event raceEvent)
        {
            bool status = false;
            string msg = "";
            try
            {
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
            }
            catch (Exception ex)
            {
                status = false;
                msg = ex.Message;
            }
            return new JsonResult { Data = new { status = status, msg = msg } };
        }

        [HttpGet]
        public ActionResult SavePitstop(Guid id)
        {
            try
            {
                var raceEvent = _eventRepository.GetById(id);
                var pitstops = raceEvent.Pitstops.OrderBy(x => x.Order).ToList();
                var pitstopJson = new List<PitstopViewModel>();

                foreach (var item in pitstops)
                {
                    pitstopJson.Add(new PitstopViewModel
                    {
                        Id = item.Id,
                        Location = item.Location,
                        Order = item.Order
                    });
                }
                return Json(new { status = true, pitstops = pitstopJson }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = false, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetTeamsForEvent(Guid id)
        {
            try
            {
                var raceEvent = _eventRepository.GetById(id);
                var eventTeamList = raceEvent.Teams.ToList();
                var teamModelJson = new List<TeamJsonModel>();

                foreach (var item in eventTeamList)
                {
                    teamModelJson.Add(new TeamJsonModel
                    {
                        Id = item.ID,
                        TeamName = item.Name
                    });
                }
                return Json(new { status = true, teamModel = teamModelJson }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = false, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [ActionName("SavePitstop")]
        public ActionResult SavePit(string eventId, string latLngString)
        {
            try
            {
                if (latLngString != null)
                {
                    var latlngarray = latLngString.Split('/');
                    var raceEvent = _eventRepository.GetById(Guid.Parse(eventId));
                    foreach (var item in latlngarray)
                    {
                        var pitstopArray = item.Split('_');
                        var latlng = pitstopArray[0];
                        var order = pitstopArray[1];
                        List<Pitstop> pitstops = new List<Pitstop>();

                        raceEvent.Pitstops.Add(new Pitstop
                        {
                            Id = Guid.NewGuid(),
                            Location = latlng,
                            Order = Convert.ToInt32(order),
                            EventId = Guid.Parse(eventId)
                        });
                    }
                    _eventRepository.Save();
                    return new JsonResult { Data = new { status = true } };
                }
                else
                {
                    throw new Exception("Latitute Longitude not found") { };
                }
            }
            catch (Exception ex)
            {
                return new JsonResult { Data = new { status = true, msg = ex.Message } };
            }
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

        [HttpPost]
        public ActionResult DeleteAllPitstops(Guid eventId)
        {
            _eventRepository.DeleteAllPitstop(eventId);
            return new JsonResult { Data = new { status = true } };
        }
    }
}