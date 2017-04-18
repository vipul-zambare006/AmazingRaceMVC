using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AmazingRaceMVC.Controllers
{
    [Authorize]
    public class LeaderboardController : Controller
    {
        // GET: Leaderboard
        [Authorize(Roles="team")]
        public ActionResult Index()
        {
            return View();
        }
    }
}