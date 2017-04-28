using Models;
using BusinessLayer;
using System;
using System.Web.Mvc;

namespace AmazingRaceMVC.Controllers
{
    public class StaffController : Controller
    {
        StaffRepository _staffRepository = new StaffRepository();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetStaffs()
        {
            var staffData = _staffRepository.GetAll();
            return Json(new { data = staffData }, JsonRequestBehavior.AllowGet);

        }
        [HttpGet]
        public ActionResult Save(String ID)
        {
            var status = false;
            var staffModel = new Staff();

            if (!string.IsNullOrEmpty(ID))
            {
                staffModel = _staffRepository.GetByID(Guid.Parse(ID));
                if (staffModel != null)
                {
                    status = true;
                }
            }
            return Json(new { status = status, StaffJsonData = staffModel }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Save(Staff staffentity)
        {
            bool status = false;
            var message = "";
            //Validation
            try
            {
                if (staffentity != null)
                {
                    var staffobj = _staffRepository.GetByID(staffentity.ID);

                    if (staffobj != null)
                    {
                        staffobj.Name = staffentity.Name;
                        staffobj.Location = staffentity.Location;
                        _staffRepository.Update(staffobj);
                        status = true;
                    }
                    else
                    {
                        _staffRepository.Add(staffentity);
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
            var staffobj = _staffRepository.GetByID(ID);
            return View(staffobj);
        }

        [HttpPost]
        [ActionName("Delete")]
        public ActionResult DeleteStaff(Guid ID)
        {
            _staffRepository.Remove(ID);
            return new JsonResult { Data = new { status = true } };
        }
    }
}