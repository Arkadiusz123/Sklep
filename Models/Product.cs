using System.ComponentModel.DataAnnotations;

namespace Sklep.Models
{
    public class Product
    {
        public int ProductId { get; set; }

        [Required]
        public string Name { get; set; }

        [Range(0, 9999999999999999.99)]
        [RegularExpression(@"^\d+(\.\d{1,2})?$")]
        [Required]
        public decimal Price { get; set; }
    }
}
