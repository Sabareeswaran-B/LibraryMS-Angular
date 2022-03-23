import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router) { }

    canActivate() {
        if (Number.parseInt(localStorage.getItem('role')!) == 0) {
            return true;
        }

        this.router.navigateByUrl('/employee/dashboard');
        return false;
    }
    canActivateChild() {
        if (Number.parseInt(localStorage.getItem('role')!) == 0) {
            return true;
        }

        this.router.navigateByUrl('/employee/dashboard');
        return false;
    }
}