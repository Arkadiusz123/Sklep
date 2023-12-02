using System.ComponentModel.DataAnnotations;

namespace Sklep.Auth
{
    public enum UserRoles
    {
        Admin,

        [Display(Name = "Kupujący")]
        User,

        [Display(Name = "Sprzedawca")]
        Seller
    }
}
