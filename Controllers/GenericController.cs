using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sklep.Repository;
using Sklep.Tools;
using System.Collections.Generic;
using System.Linq;

namespace Sklep.Controllers
{
    public abstract class GenericController<EntityType, ViewModelType> : ControllerBase where EntityType : class where ViewModelType : class
    {
        protected UnitOfWork _unitOfWork;
        protected IMapper _mapper;

        public GenericController(IMapper mapper)
        {
            _unitOfWork = new UnitOfWork();
            _mapper = mapper;
        }

        [HttpGet]
        public virtual ActionResult<List<ViewModelType>> GetList()
        {
            return _unitOfWork.Repository<EntityType>()
                .GetCollection()
                .ToList()
                .Select(x => _mapper.Map<ViewModelType>(x))
                .ToList();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public virtual ActionResult Add([FromBody]ViewModelType viewModel)
        {
            if (!ModelState.IsValid)            
                return BadRequest(ModelState.ValidationMessage());

            EntityType entity = _mapper.Map<EntityType>(viewModel);

            _unitOfWork.Repository<EntityType>().Add(entity);
            _unitOfWork.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public virtual ActionResult<ViewModelType> GetObject(int id)
        {
            var entity = _unitOfWork.Repository<EntityType>().GetEntity(id);

            if (entity == null)
                return NotFound();

            return _mapper.Map<ViewModelType>(entity);
        }

        [HttpPost]
        public virtual ActionResult Edit(int id, [FromBody]ViewModelType viewModel)
        {
            var entity = _unitOfWork.Repository<EntityType>().GetEntity(id);

            if (entity == null)
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest(ModelState.ValidationMessage());

            _mapper.Map(viewModel, entity);
            _unitOfWork.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        public virtual ActionResult Delete(int id)
        {
            var entity = _unitOfWork.Repository<EntityType>().GetEntity(id);

            if (entity == null)
                return NotFound();

            _unitOfWork.Repository<EntityType>().Delete(entity);
            _unitOfWork.SaveChanges();

            return NoContent();
        }
    }
}
