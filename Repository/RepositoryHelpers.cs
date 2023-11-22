using Sklep.Auth;
using System.Linq;

namespace Sklep.Repository
{
    public static class RepositoryHelpers
    {
        public static IQueryable<ApplicationUser> UsersWithShoppingCards(this GenericRepository<ApplicationUser> repository)
        {
            return repository.GetCollectionWithRelated(
                x => x.ShoppingCard,
                x => x.ShoppingCard.ShoppingCardRows
                );
        }
    }
}