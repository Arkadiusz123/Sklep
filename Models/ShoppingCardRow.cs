namespace Sklep.Models
{
    public class ShoppingCardRow
    {
        public int ShoppingCardRowId { get; set; }
        public int Quantity { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public virtual ShoppingCard ShoppingCard { get; set; }

    }
}
