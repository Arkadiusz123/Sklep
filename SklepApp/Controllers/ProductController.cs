using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sklep.Models;
using Sklep.ViewModels;
using System.Collections.Generic;

namespace Sklep.Controllers
{
    [Authorize]
    public class ProductController : GenericController<Product, ProductVm>
    {
        public ProductController(IMapper mapper) : base(mapper)
        {

        }

        [AllowAnonymous]
        public override ActionResult<List<ProductVm>> GetList()
        {
            return base.GetList();
        }
    }
}
