using Microsoft.AspNetCore.Identity;
using Sklep.Models;

namespace Sklep.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public virtual ShoppingCard ShoppingCard { get; set; }
    }
}
