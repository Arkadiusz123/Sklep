using System.ComponentModel.DataAnnotations;

namespace Sklep.Models
{
    public class ShoppingCardRow
    {
        public int ShoppingCardRowId { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; } = 1;

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public string ShoppingCardId { get; set; }
        public virtual ShoppingCard ShoppingCard { get; set; }

    }
}
