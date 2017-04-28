using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
//using System.Web.Http;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using AmazingRaceMVC.Models;

namespace AmazingRaceMVC.Controllers
{
    public class MapController : Controller
    {  

        // GET: Map
        public ActionResult AmazingMap()
        {
            return View();
        }

        public ActionResult Myleaderboard() {

            return View();
        }
        
        [HttpPost]
        public JsonResult Initialize(int teamId, string team, int totalPitstops, int remainingPitstops, int currentPitstops)
        {
            Board board = new Board();
            board.TeamId = teamId;
            board.PitStopsCleared = currentPitstops;
            board.PitStopsRemaining = remainingPitstops;
            board.TotalPitStops = totalPitstops;
            board.Team = team;
            
                //System.Diagnostics.Debug.WriteLine("init:" + initLeaderboard[0]);
                var hubContext = GlobalHost.ConnectionManager.GetHubContext<BoardHub>();
                //var name = initLeaderboard[0];
                hubContext.Clients.All.appendTeam(board);
                //Console.Write("Anna is here");
                //Hub.Clients.All.getAllTeams(initLeaderboard);
                //var response = initLeadJerboard;
                return Json(new { ok= true, mydata =team  ,message ="Successfull"});
                //return new JsonResult(new { });            
                      
        }

        [HttpPost]
        public JsonResult Execute(int teamId, string team, int totalPitstops, int remainingPitstops, int currentPitstops)
        {
            Board board = new Board();
            board.TeamId = teamId;
            board.PitStopsCleared = currentPitstops;
            board.PitStopsRemaining = remainingPitstops;
            board.TotalPitStops = totalPitstops;
            board.Team = team;
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<BoardHub>();
            hubContext.Clients.All.updateLeaderBoard(board);
            return Json(new { ok = true, mydata = team, message = "Successfull" });
        }
    }
}