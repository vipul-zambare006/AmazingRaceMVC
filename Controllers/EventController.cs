using System.Web.Mvc;
using BusinessLayer;
using System.Linq;
using AmazingRaceMVC.Models;
using System;

namespace AmazingRaceMVC.Controllers
{
    public class EventController : Controller
    {
        EventManagement em = new EventManagement();
        // GET: Event
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getEvents()
        {
            var jsonData = new
            {
                total = 1,
                page = 1,
                records = em.GetAllEvents().Count,

                rows = (
                 from ev in em.GetAllEvents().ToList()
                 select new
                 {
                     id = ev.Id,
                     cell = new string[] {
                      ev.EventName.ToString(),
                      ev.EventDateTime.ToString(),
                      ev.City.ToString(),
                      }
                 }).ToArray()
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);

            //List<Event> evList = em.GetAllEvents();
            //return View(evList);
        }

        [HttpPost]
        public string Create([Bind(Exclude = "Id")] Event eventModel)
        {
           // ApplicationDbContext db = new ApplicationDbContext();
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    eventModel.Id = Guid.NewGuid();
                    em.AddEvent(eventModel);

                    msg = "Saved Successfully";
                }
                else
                {
                    msg = "Validation data not successfully";
                }
            }
            catch (Exception ex)
            {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        public string Edit(Event eventModel)
        {
           
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    em.Update(eventModel);
                    msg = "Saved Successfully";
                }
                else
                {
                    msg = "Validation data not successfully";
                }
            }
            catch (Exception ex)
            {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        public string Delete(string Id)
        {
            em.Remove(Guid.Parse(Id));
            return "Deleted successfully";
        }

    }
}

//public interface IDBContext
//{

//}


//public interface IProductRepository
//{

//}

//public class Product
//{

//}



//public interface IProductRepository : IDisposable
//{
//    void AddProduct(Product product);
//    int SaveChanges();
//    IOrderedQueryable<Product> GetAllProductsOrderedByName();
//}

//public class ProductRepository : IProductRepository
//{
//    private readonly IDBContext _dbContext;
//    public ProductRepository() : this(new ProductContext())
//    {
//    }
//    public ProductRepository(IDBContext dbContext)
//    {
//        _dbContext = dbContext;
//    }
//    public void Dispose()
//    {
//        _dbContext.Dispose();
//    }
//}

//public interface IProductContext : IDisposable
//{
//    IDbSet<Product> Products { get; set; }
//    int SaveChanges();
//}

//public class ProductContext : DbContext, IProductContext
//{
//    public IDbSet<Product> Products { get; set; }

//}

//public class FakeDbSet<T> : IDbSet<T> where T : class
//{
//    ObservableCollection<T> _data;
//    IQueryable _query;
//    public FakeDbSet()
//    {
//        _data = new ObservableCollection<T>();
//        _query = _data.AsQueryable();
//    }

//    public T Add(T item)
//    {
//        _data.Add(item);
//        return item;
//    }

//    public T Remove(T item)
//    {
//        _data.Remove(item);
//        return item;
//    }
//}

//class FakeDbContext : IDBContext
//{
//    public FakeDbContext()
//    {
//        Products = new FakeDbSet<Product>();
//    }
//    public IDbSet<Product> Products { get; set; }

//    public int SaveChanges()
//    {
//        return 0;
//    }

//    public void Dispose()
//    {
//        throw new NotImplementedException();
//    }
//}
