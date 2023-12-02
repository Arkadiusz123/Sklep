using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sklep.Auth;
using Sklep.Models;
using Sklep.Repository;
using Sklep.ViewModels;
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
        public ActionResult GetShoppingCard()
        {
            var user = _unitOfWork.Repository<ApplicationUser>().GetCollection()
                .Include(x => x.ShoppingCard)
                .Include(x => x.ShoppingCard.ShoppingCardRows)
                .ThenInclude(x => x.Product)
                .SingleOrDefault(x => x.UserName == User.Identity.Name);

            if (user == null)
                return Unauthorized();

            if (user.ShoppingCard == null || user.ShoppingCard.ShoppingCardRows == null)
                return Ok();

            return Ok(new ShoppingCardVm(user.ShoppingCard));
        }

        [HttpPost]
        public ActionResult AddProduct(int id)
        {
            var product = _unitOfWork.Repository<Product>().GetEntity(id);
            if (product == null)
                return NotFound();

            var user = _unitOfWork.Repository<ApplicationUser>().UsersWithShoppingCards().SingleOrDefault(x => x.UserName == User.Identity.Name);

            if (user == null)
                return Unauthorized();

            if (user.ShoppingCard == null)
                user.ShoppingCard = new ShoppingCard();

            user.ShoppingCard.AddProduct(id);

            _unitOfWork.Repository<ApplicationUser>().UpdateEntity(user);
            _unitOfWork.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        public ActionResult RomoveProduct(int id)
        {
            var product = _unitOfWork.Repository<Product>().GetEntity(id);
            if (product == null)
                return NotFound();

            var user = _unitOfWork.Repository<ApplicationUser>().UsersWithShoppingCards().SingleOrDefault(x => x.UserName == User.Identity.Name);
            if (user == null)
                return Unauthorized();

            if (user.ShoppingCard == null)
                return BadRequest();

            var result = user.ShoppingCard.TryRemoveProduct(id);
            if (!result)
                return BadRequest();

            _unitOfWork.Repository<ApplicationUser>().UpdateEntity(user);
            _unitOfWork.SaveChanges();

            return Ok();
        }
    }
}
