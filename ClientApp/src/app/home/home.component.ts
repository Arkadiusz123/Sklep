import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Product } from '../product-form/product-form.component';

@Component({
  selector: 'app-home',
    templateUrl: './home.component.html',  
})
export class HomeComponent implements OnInit {
    products: Observable<Product[]>;

    constructor(private apiService: ApiService<Product>) { }

    ngOnInit() {
        this.products = this.apiService.getList("Product");
    }
}
