using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace AmazingRaceMVC
{
    public class MyHub : Hub
    {
        public void send(string teamObject)
        {
            Clients.All.broadcastMessage(teamObject);
        }      
    }
}