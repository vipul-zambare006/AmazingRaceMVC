//using System;

//public static class ProductRepositoryManager
//{
//    public static void CreateProduct()
//    {
//        Product product = new Product();
//        using (DBEntities context = new DBEntities())
//        {
//            UnitOfWork uow = new UnitOfWork(context);
//            // ...
//            Category category = uow.Categorys.GetById(12);
//            product.Category = category;
//            uow.Products.Add(product);
//            uow.Commit();
//        }
//        return product;
//    }
//}

//internal class Category
//{
//}

//internal class UnitOfWork
//{
//}

//public static class CategoryRepositoryManager
//{
//    internal static Category CreateCategory()
//    {
//        throw new NotImplementedException();
//    }
//}
//// Create a category. A database connection will be opened and closed.
//Category category = CategoryRepositoryManager.CreateCategory();

//// Create a Product with the category. A database connection will be opened and closed.
//ProductRepositoryManager.CreateProduct(category);
 
