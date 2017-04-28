using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace AmazingRaceMVC
{
    public static class Util
    {

        public static string getRootUri()
        {

            // For IIS Express, use localhost:7734 

            var uri = "http://localhost:65448/";

            // Get the root URI from Web.config

            //uri = Configuration.WidgetServiceURI;

            return uri;

        }



        public static string getServiceUri(string srv)
        {

            return getRootUri() + "Map/" + srv;

        }

    }
}