import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(public auth: LoginService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isUserLogedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
  
}
