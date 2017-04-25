using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using System.Web;



[assembly: OwinStartup(typeof(AmazingRaceMVC.Startup))]

namespace AmazingRaceMVC
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=316888
            app.MapSignalR();

            //HttpConfiguration config = new HttpConfiguration();

            //config.Routes.MapHttpRoute(
            //    name: "MapsApi",
            //    routeTemplate: "{Map/Execute}"
            //);
        }
    }
}
