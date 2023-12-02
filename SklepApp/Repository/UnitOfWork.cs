using Sklep.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sklep.Repository
{
    public class UnitOfWork
    {
        private ShopContext _dbContext;
        public UnitOfWork()
        {
            _dbContext = new ShopContext();
        }

        public UnitOfWork(ShopContext dbContext)
        {
            _dbContext = dbContext;
        }

        private Dictionary<Type, object> repositories = new Dictionary<Type, object>();

        public GenericRepository<T> Repository<T>() where T : class
        {
            if (repositories.Keys.Contains(typeof(T)))
                return repositories[typeof(T)] as GenericRepository<T>;

            var repo = new GenericRepository<T>(_dbContext);
            repositories.Add(typeof(T), repo);
            return repo;
        }

        public void SaveChanges()
        {
            _dbContext.SaveChanges();
        }
    }
}
