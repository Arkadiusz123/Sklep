using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sklep.Auth;
using Sklep.Models;
using Sklep.Repository;
using System.Linq;

namespace Sklep.Controllers
{
    [Authorize]
    public class ShoppingCardController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ShoppingCardController(IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _unitOfWork = new UnitOfWork();
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult AddProduct(int id)
        {
            var product = _unitOfWork.Repository<Product>().GetEntity(id);
            if (product == null)
                return NotFound();

            var user = _unitOfWork.Repository<ApplicationUser>()
                .GetCollectionWithRelated(x => x.ShoppingCard, x => x.ShoppingCard.ShoppingCardRows)
                .SingleOrDefault(x => x.UserName == User.Identity.Name);

            if (user == null)
                return Unauthorized();

            if (user.ShoppingCard == null)
                user.ShoppingCard = new ShoppingCard();

            user.ShoppingCard.AddProduct(id);
            _unitOfWork.Repository<ApplicationUser>().UpdateEntity(user);

            _unitOfWork.SaveChanges();

            return Ok();
        }
    }
}
