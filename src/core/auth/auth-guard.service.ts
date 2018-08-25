import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanLoad,
    CanActivateChild,
    Route,
    Router,
    RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin(state.url);
    }

    canLoad(route: Route): boolean {
        return this.checkLogin(window.location.pathname);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        } else {
            this.authService.redirectUrl = url;
            this.router.navigate(['/ui/login']);
            return false;
        }
    }
}
