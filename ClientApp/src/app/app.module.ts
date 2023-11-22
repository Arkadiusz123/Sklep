import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ProductFormComponent,
        NotFoundComponent,
        LoginComponent,
        AccessDeniedComponent,
        ShoppingCardComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),      
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'product-form', component: ProductFormComponent },
            { path: 'product-form/:id', component: ProductFormComponent, canActivate: [AuthGuardService], data: { expectedRole: "Admin" } },
            { path: 'not-found', component: NotFoundComponent },
            { path: 'access-denied', component: AccessDeniedComponent },
            { path: 'log-in', component: LoginComponent },
            { path: 'shop-card', component: ShoppingCardComponent }
        ])
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})
export class AppModule { }
