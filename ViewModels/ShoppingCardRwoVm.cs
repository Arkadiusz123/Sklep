using Sklep.Models;

namespace Sklep.ViewModels
{
    public class ShoppingCardRwoVm
    {
        public ShoppingCardRwoVm(ShoppingCardRow shoppingCardRow)
        {
            ProductId = shoppingCardRow.ProductId;
            ProductName = shoppingCardRow.Product.Name;
            Quantity = shoppingCardRow.Quantity;
            ProductPrice = shoppingCardRow.Product.Price;
        }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal ProductPrice { get; set; }
    }
}
