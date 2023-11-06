using Microsoft.EntityFrameworkCore;
using Sklep.Models;
using System.Linq;

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
