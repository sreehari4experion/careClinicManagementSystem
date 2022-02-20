import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    //check role :      current role      vs       expected role
    // login -          local storage      -       app-routing.module
    const expectedUser = next.data.RoleId;
    const currentUser = localStorage.getItem('accessRole');

    // check condition for current role vs expected role
    if (currentUser != expectedUser) {
      this.router.navigateByUrl('login');
      return false;
    } else {
      return true;
    }
  }
}
