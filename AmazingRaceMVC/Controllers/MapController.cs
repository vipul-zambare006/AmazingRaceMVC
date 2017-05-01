//using System.Web.Http;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using AmazingRaceMVC.Models;
using BusinessLayer;

namespace AmazingRaceMVC.Controllers
{
    [System.Web.Mvc.Authorize]
    public class MapController : Controller
    {
        public ActionResult AmazingMap()
        {
                EventRepository _ev = new EventRepository();
                ViewBag.Event_ID = new SelectList(_ev.GetAll(), "Id", "EventName");
                return View();
        }

        public ActionResult Myleaderboard()
        {

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

            var hubContext = GlobalHost.ConnectionManager.GetHubContext<BoardHub>();
            //var name = initLeaderboard[0];
            hubContext.Clients.All.appendTeam(board);
            //Console.Write("Anna is here");
            //Hub.Clients.All.getAllTeams(initLeaderboard);
            //var response = initLeadJerboard;
            return Json(new { ok = true, mydata = team, message = "Successfull" });
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

        [HttpPost]
        public JsonResult Finished(string finished)
        {
            var hubContext = GlobalHost.ConnectionManager.GetHubContext<BoardHub>();
            hubContext.Clients.All.finishedEvent();
            return Json(new { ok = true, mydata = finished, message = "Successfull" });
        }
    }
}