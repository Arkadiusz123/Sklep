using Sklep.Auth;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Sklep.Models
{
    public class ShoppingCard
    {
        [ForeignKey("ApplicationUser")]
        public string ShoppingCardId { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public virtual List<ShoppingCardRow> ShoppingCardRows { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public void AddProduct(int productId)
        {
            if (ShoppingCardRows == null)
                ShoppingCardRows = new List<ShoppingCardRow>();

            var existingRow = ShoppingCardRows.SingleOrDefault(x => x.ProductId == productId);

            if (existingRow != null)
                existingRow.Quantity++;
            else
                ShoppingCardRows.Add(new ShoppingCardRow() { ProductId = productId });
        }

        public bool TryRemoveProduct(int productId)
        {
            if (ShoppingCardRows == null)
                return false;

            var row = ShoppingCardRows.SingleOrDefault(x => x.ProductId == productId);

            if (row == null || row.Quantity < 1)
                return false;

            row.Quantity--;

            if (row.Quantity < 1)
                ShoppingCardRows.Remove(row);

            return true;
        }
    }
}
