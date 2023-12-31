﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Sklep.Auth;
using System;

namespace Sklep.Models
{
    public class ShopContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<ShoppingCard> ShoppingCards { get; set; }
        public DbSet<ShoppingCardRow> ShoppingCardRows { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            //optionsBuilder.UseLazyLoadingProxies();   //uncomment if you want to turn on lazy loading
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ShoppingCardRow>().HasIndex(p => new { p.ProductId, p.ShoppingCardId }).IsUnique();
        }
    }
}
