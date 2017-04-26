using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;


namespace AmazingRaceMVC.Controllers
{
    public abstract class MapControllerWithHub<THub> : Controller where THub: IHub
    {
        Lazy<IHubContext> hub = new Lazy<IHubContext>(
            () => GlobalHost.ConnectionManager.GetHubContext<THub>()
        );

        protected IHubContext Hub
        {
            get { return hub.Value; }
        }

        // GET: MapControllerWithHub
        public ActionResult Index()
        {
            return View();
        }
    }
}