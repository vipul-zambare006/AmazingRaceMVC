//using BusinessLayer;
//using Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;

//namespace AmazingRaceMVC.Controllers
//{
//    public class TeamController : Controller
//    {
//        TeamRepository tr = new TeamRepository();


//        // GET: Team
//        public ActionResult Index()
//        {
//            return View();
//        }

//        [HttpGet]
//        public JsonResult GetTeams()
//        {
//            return Json(tr.GetAll(), JsonRequestBehavior.AllowGet);
//        }

//        [HttpPost]
//        public ActionResult Create(Team teamentity)
//        {
//            var result = new JsonResult();
//            bool createStatus = false;
//            if (ModelState.IsValid)
//            {
//                createStatus = tr.Add(teamentity);
//                result = new JsonResult { Data = new { status = createStatus, msg = "Create Successful" } };
//            }

//            return result;
//        }

//        [HttpPost]
//        public ActionResult Edit(Team teamentity)
//        {
//            var result = new JsonResult();
//            bool updateStatus = false;
//            if (ModelState.IsValid)
//            {
//                updateStatus = tr.Update(teamentity);
//                return new JsonResult { Data = new { status = updateStatus, msg = "Update Successful" } };
//            }

//            return result;

//        }

//        [HttpPost]
//        [ActionName("Delete")]
//        public ActionResult Delete(Team teamentity)
//        {
//            var result = new JsonResult();
//            bool deleteStatus = false;
//            if (ModelState.IsValid)
//            {
//                deleteStatus = tr.Remove(teamentity);
//                return new JsonResult { Data = new { status = deleteStatus, msg = "Delete Successful" } };
//            }

//            return result;

//        }

//    }
//}