using AmazingRaceMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace AmazingRaceMVC.Controllers
{
    [AllowAnonymous]
    public class LoginController : Controller
    {
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(Staff model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            Staff user = new Staff() { UserName = model.UserName, Password = model.Password };
            user = user.GetUserDetails(user);

            if (user != null)
            {
                Session["Username"] = model.UserName;

                FormsAuthentication.SetAuthCookie(model.UserName, false);

                var authTicket = new FormsAuthenticationTicket(1, user.UserName, DateTime.Now, DateTime.Now.AddMinutes(20), false, user.Role);
                string encryptedTicket = FormsAuthentication.Encrypt(authTicket);
                var authCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
                HttpContext.Response.Cookies.Add(authCookie);
                //return RedirectToAction("Index", "Admin");
                return RedirectToAction("Index", "Event");
            }

            else
            {
                ModelState.AddModelError("", "Invalid login attempt.");
                return View(model);
            }
            
        }

        public ActionResult LogOff()
        {
            // AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }
    }
}