using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AmazingRaceMVC.Controllers
{
    public class MapController : Controller
    {
        private readonly object _updateLeaderBoardLock = new object();

        private volatile bool _updatingLeaderBoard = false;

        

        // GET: Map
        public ActionResult AmazingMap()
        {
            return View();
        }


        public object[] Initialize(object[] initLeaderboard)
        {
            if (initLeaderboard != null)
            {
                var hubContext = GlobalHost.ConnectionManager.GetHubContext<BoardHub>();

                hubContext.Clients.All.getAllTeams(initLeaderboard);
                //Hub.Clients.All.getAllTeams(initLeaderboard);
                
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