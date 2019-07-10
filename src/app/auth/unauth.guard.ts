import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
  constructor(private auth: AuthService, private _router: Router ) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.getCurrentUser2()
            .then(() => {
              this._router.navigate(['auth/profile']);
              return false;
            })
            .catch(() => {
              return true;
            });
  }
}
