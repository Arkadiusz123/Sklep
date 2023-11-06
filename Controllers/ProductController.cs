using AutoMapper;
using Sklep.Models;
using Sklep.ViewModels;

namespace Sklep.Controllers
{
    public class ProductController : GenericController<Product, ProductVm>
    {
        public ProductController(IMapper mapper) : base(mapper)
        {

        }
    }
}
