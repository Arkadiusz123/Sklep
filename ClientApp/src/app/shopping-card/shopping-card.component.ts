import { Component, OnInit } from '@angular/core';
import { ShoppingCardService } from '../services/shopping-card.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
  model: Partial<ShoppingCard> = {};

  constructor(private shopCardService: ShoppingCardService, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.shopCardService.getShoppingCard().subscribe(
      result => this.model = result,
      error => this.errorHandler.handleError(error)
    )
  }

}

export interface ShoppingCard {
  shoppingCardId: string;
  created: Date;
  totalPrice: number;
  rows: ShoppingCardRow[];
}

export interface ShoppingCardRow {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}
