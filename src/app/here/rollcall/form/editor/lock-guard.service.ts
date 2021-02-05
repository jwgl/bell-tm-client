import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { RollcallForm } from '../rollcall-form.model';
import { Injectable } from "@angular/core";

@Injectable()
export class RollcallLockGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const form: RollcallForm = route.parent.data['form'];
        return !(form && form.locked);
    }
}
