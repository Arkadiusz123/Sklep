import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Product } from '../product-form/product-form.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',  
})
export class HomeComponent implements OnInit {
    products: Observable<Product[]>;
    isAuthenticated: boolean;

    constructor(public apiService: ApiService<Product>, private authService: AuthService) { }

    ngOnInit() {
        this.products = this.apiService.getList("Product");
        this.isAuthenticated = this.authService.isAuthenticated();
    }
}
