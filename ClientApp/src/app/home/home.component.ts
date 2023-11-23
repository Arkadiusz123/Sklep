import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Product } from '../product-form/product-form.component';
import { AuthService } from '../services/auth.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { ShoppingCardService } from '../services/shopping-card.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',  
})
export class HomeComponent implements OnInit {
    products: Observable<Product[]>;
    isAuthenticated: boolean;
    controllerName: string = "Product";

    constructor(private apiService: ApiService<Product>, private authService: AuthService, private errorHandler: ErrorHandlerService,
         public shopCardService: ShoppingCardService) { }

    ngOnInit() {
        this.isAuthenticated = this.authService.isAuthenticated();

        this.apiService.getList(this.controllerName);
        this.products = this.apiService.objects$;
    }

    deleteItem(id: string){
        if(!confirm("Czy na pewno chcesz usunąć?")){
            return;
        }

        this.apiService.deleteItem(id, this.controllerName, "productId")
        .subscribe(
            () => {},
            error => this.errorHandler.handleError(error)
        );
    }
}
