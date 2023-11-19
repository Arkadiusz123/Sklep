using Microsoft.EntityFrameworkCore;
using Sklep.Models;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace Sklep.Repository
{
    public class GenericRepository<T> where T : class
    {
        private DbSet<T> _dbSet;

        public GenericRepository(ShopContext dbContext)
        {
            _dbSet = dbContext.Set<T>();
        }

        public IQueryable<T> GetCollection()
        {
            return _dbSet;
        }

        public IQueryable<T> GetCollectionWithRelated(params Expression<Func<T, object>>[] includes)
        {
            if (includes == null || includes.Count() == 0)
                throw new ArgumentNullException();

            var query = GetCollection();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query;
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }

        public T GetEntity(int id)
        {
            return _dbSet.Find(id);
        }

        public void UpdateEntity(T entity)
        {
            _dbSet.Update(entity);
        }
    }
}
