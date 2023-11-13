import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRole = route.data.expectedRole;
    const currentUserRoles = this.authService.getUserRoles() ?? new Array<string>;

    if(!this.authService.isAuthenticated() || !currentUserRoles.includes(expectedRole)){
      this.router.navigate(['access-denied']);
      return false;
    }
    return true;
  }
}
