using AmazingRaceMVC.Models;
using BusinessLayer;
using Models;
using System;
using System.IO;
using System.Web.Mvc;

namespace AmazingRaceMVC.Controllers
{
    [Authorize]
    public class TeamController : Controller
    {
        TeamRepository _teamRepository = new TeamRepository();
        public ActionResult Index()
        {
            EventRepository _ev = new EventRepository();
            ViewBag.Event_ID = new SelectList(_ev.GetAll(), "Id", "EventName");
            return View();
        }

        [HttpGet]
        public JsonResult GetTeams()
        {
            var teamData = _teamRepository.GetAll();
            return Json(new { data = teamData }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult Save(String ID)
        {
            var status = false;
            var teamModel = new Team();

            if (!string.IsNullOrEmpty(ID))
            {
                teamModel = _teamRepository.GetByID(Guid.Parse(ID));
                if (teamModel != null)
                {
                    teamModel.Event = null;
                    status = true;
                }
            }
            return Json(new { status = status, TeamJsonData = teamModel }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(TeamViewModel teamentity)
        {
            bool status = false;
            var message = "";
            try
            {
                if (teamentity != null)
                {
                    var teamobj = _teamRepository.GetByID(teamentity.ID);

                    if (teamobj != null)
                    {
                        teamobj.Name = teamentity.Name;
                        teamobj.ImagePath = teamentity.ImagePath;
                        _teamRepository.Update(teamobj);
                        status = true;
                    }
                    else
                    {
                        _teamRepository.Add(teamentity);
                        status = true;
                    }
                }
            }
            catch (Exception e)
            {
                status = false;
                message = e.Message;
            }
            return new JsonResult { Data = new { status = status, msg = message } };
        }

        [HttpGet]
        public ActionResult Delete(Guid ID)
        {
            var teamobj = _teamRepository.GetByID(ID);
            return View(teamobj);
        }

        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteTeam(Guid ID)
        {
            _teamRepository.Remove(ID);
            return new JsonResult { Data = new { status = true } };
        }

        [HttpGet]
        public ActionResult Detail(String ID)
        {
            var eventName = "";
            var teamname = "";
            var imagePath = "";
            var teamModel = new Team();
            if (!String.IsNullOrEmpty(ID))
            {
                EventRepository _eventRepository = new EventRepository();
                teamModel = _teamRepository.GetByID(Guid.Parse(ID));
                if (teamModel != null)
                {
                    eventName = teamModel.EventId != null ? teamModel.Event.EventName : string.Empty;
                    imagePath = teamModel.ImagePath;
                    teamname = teamModel.Name;
                    teamModel.Event = null;
                }
                return Json(new { Data = new { data = teamname, imagePath, eventName } }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { success = false }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult ImageUpload(TeamViewModel model)
        {
            var file = model.ImageFile;
            var imagepath = "";

            if (file != null)
            {
                var fileName = Path.GetFileName(file.FileName);
                var extention = Path.GetExtension(file.FileName);
                var filenamewithoutextention = Path.GetFileNameWithoutExtension(file.FileName);

                file.SaveAs(Server.MapPath("/UploadedImages/" + file.FileName));

                imagepath = "/UploadedImages/" + fileName;
            }
            return new JsonResult { Data = new { data = file.FileName, imagepath } };
        }
    }
}