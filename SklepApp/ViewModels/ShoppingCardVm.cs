﻿using Sklep.Models;
using System;
using System.Collections.Generic;

namespace Sklep.ViewModels
{
    public class ShoppingCardVm
    {
        public ShoppingCardVm(ShoppingCard shoppingCard)
        {
            ShoppingCardId = shoppingCard.ShoppingCardId;
            Created = shoppingCard.Created;
            Rows = new List<ShoppingCardRwoVm>();
            foreach (var row in shoppingCard.ShoppingCardRows)
            {
                Rows.Add(new ShoppingCardRwoVm(row));
            }
        }

        public string ShoppingCardId { get; set; }
        public DateTime Created { get; set; }
        public List<ShoppingCardRwoVm> Rows { get; set; }
    }
}
