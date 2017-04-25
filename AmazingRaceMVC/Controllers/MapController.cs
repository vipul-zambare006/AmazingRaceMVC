using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace AmazingRaceMVC.Controllers
{
    public class MapController : Controller
    {
        // GET: Map
        public ActionResult AmazingMap()
        {
            return View();
        }


      
        
        public string[] Initialize(string[] initLeaderboard)
        {
            if (initLeaderboard != null)
            {
                 return initLeaderboard;
            }

            return null;
        }


        

        public string Execute(string teamObject)
        {
            return teamObject;
        }
    }
}