using AutoMapper;
using Sklep.Models;
using Sklep.ViewModels;

namespace Sklep.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ProductVm, Product>();
            CreateMap<Product, ProductVm>();
        }
    }
}
