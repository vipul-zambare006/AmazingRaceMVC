using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AmazingRaceMVC.Controllers
{
    //[CustomErrorHandler]
    public class HomeController : Controller
    {
        // GET: Home
        //[Authorize(Roles = "Admin")]
        public ActionResult Index()
        {
            
            return View();
        }
    }
}