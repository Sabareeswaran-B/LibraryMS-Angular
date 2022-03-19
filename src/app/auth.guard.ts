import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
  canActivateChild() {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

}

