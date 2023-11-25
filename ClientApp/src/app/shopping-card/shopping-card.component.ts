import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from '../services/shopping-card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  model: Observable<ShoppingCard>;

  constructor(public shopCardService: ShoppingCardService) { }

  ngOnInit(): void {
    this.shopCardService.getShoppingCard();
    this.model = this.shopCardService.objects$;
  }

  totalPrice(shopCard: ShoppingCard): number {
    let totalPrice = 0;

     for(let i = 0; i < shopCard.rows.length; i++){
     totalPrice += shopCard.rows[i].productPrice * shopCard.rows[i].quantity;
     }
     
    return totalPrice;
  }

}

export interface ShoppingCard {
  shoppingCardId: string;
  created: Date;
  rows: ShoppingCardRow[];
}

export interface ShoppingCardRow {
  productId: string;
  productName: string;
  quantity: number;
  productPrice: number;
}
