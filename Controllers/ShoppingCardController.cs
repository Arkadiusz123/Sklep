using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sklep.Auth;
using Sklep.Models;
using Sklep.Repository;

namespace Sklep.Controllers
{
    [Authorize]
    public class ShoppingCardController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public ShoppingCardController(IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _unitOfWork = new UnitOfWork();
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult AddProduct(int id)
        {
            var product = _unitOfWork.Repository<Product>().GetEntity(id);
            if (product == null)
                return NotFound();

            var user = _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
                return Unauthorized();

            var userResult = user.Result;

            if (userResult.ShoppingCard == null)
                userResult.ShoppingCard = new ShoppingCard();

            userResult.ShoppingCard.AddProduct(id);
            _unitOfWork.SaveChanges();

            return Ok();
        }
    }
}
