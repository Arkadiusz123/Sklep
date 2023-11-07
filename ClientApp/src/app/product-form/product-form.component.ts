import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Product } from '../services/api.service';
import { ValidMessagesService } from '../services/valid-messages.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
    controllerName: string = 'Product';
    model: Partial<Product> = {};
    serverErrors: string;
    id: string = "";

    constructor(private route: ActivatedRoute, private apiService: ApiService<Product>, private router: Router, public validMessages: ValidMessagesService) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');

        if (this.id){
            this.apiService.getItem(this.id, this.controllerName).subscribe(
                result => this.model = result,
                error => console.log(error)
            )
        }
    }

    send() {
        let productObservable: Observable<Product>;
        
        if (this.id){
            productObservable = this.apiService.editItem(this.id, this.model as Product, this.controllerName);
        }
        else {
            productObservable = this.apiService.addItem(this.model as Product, this.controllerName);
        }
        productObservable.subscribe(
            () => this.router.navigate(['']),
            error => {
                this.serverErrors = error.error
                setTimeout(()=>{
                    this.serverErrors = '';
                }, 4000);
            }
        );
    }
   
}
