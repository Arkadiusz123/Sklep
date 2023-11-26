import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ValidMessagesService } from '../services/valid-messages.service';
import { Observable, Subscription } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
    controllerName: string = 'Product';
    model: Partial<Product> = {};
    serverErrors: string;
    id: string = "";
    private subscriptions: Subscription[] = [];

    constructor(private route: ActivatedRoute, private apiService: ApiService<Product>, private router: Router, private errorHandler: ErrorHandlerService,
         public validMessages: ValidMessagesService) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');

        if (this.id){
            const subscription = this.apiService.getItem(this.id, this.controllerName).subscribe(
                result => this.model = result,
                error => this.errorHandler.handleError(error)
            );
            this.subscriptions.push(subscription);
        }
    }

    send() {
        let productObservable: Observable<Product>;
        
        if (this.id){
            productObservable = this.apiService.editItem(this.id, this.model as Product, this.controllerName, "productId");
        }
        else {
            productObservable = this.apiService.addItem(this.model as Product, this.controllerName);
        }
        const subscription = productObservable.subscribe(
            () => this.router.navigate(['']),
            error => {
                this.serverErrors = error.error
                setTimeout(()=>{
                    this.serverErrors = '';
                }, 4000);
            }
        );
        this.subscriptions.push(subscription);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
          if (subscription) {
            subscription.unsubscribe();
          }
        });
      }
   
}

export interface Product {
    productId?: number;
    name: string;
    price: number;
}
