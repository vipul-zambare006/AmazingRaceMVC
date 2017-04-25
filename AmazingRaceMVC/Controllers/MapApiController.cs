using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AmazingRaceMVC.Controllers
{
    public class MapApiController : ApiController
    {

        
        [HttpPost]
        public static object[] Initialize(object[] initLeaderboard)
        {
            if (initLeaderboard != null)
            {
                return initLeaderboard;
            }

            return null;
        }

        [HttpPost]
        public IHttpActionResult Execute(string teamObject)
        {
            return Ok(teamObject);
        }

    }
}
