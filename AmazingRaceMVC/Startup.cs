using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AmazingRaceMVC.Startup))]
namespace AmazingRaceMVC
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
