using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using AmazingRaceMVC.Models;
using System.Threading.Tasks;

namespace AmazingRaceMVC
{
    
    public class BoardHub : Hub
    {
        //private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<BoardHub>();

        public void GetTeam(object[] teams)
        {
            Clients.All.getAllTeams(teams);
        }
        //public readonly BoardUpdate _boardUpdate;



        //public BoardHub() : this(BoardUpdate.Instance) { }

        //public BoardHub(BoardUpdate boardUpdate)
        //{
        //    _boardUpdate = boardUpdate;

        //}

        //public async Task<IEnumerable<Board>> GetAllRows()
        //{
        //    return await _boardUpdate.GetAllRows();
        //}

    }
}
