import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { RollcallForm } from '../rollcall-form.model';
import { RollcallFormService } from '../rollcall-form.service';

@Injectable()
export class RollcallFormEditorResolve implements Resolve<RollcallForm> {
    constructor(private service: RollcallFormService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RollcallForm> {
        return null;
        // return this.service.loadDataForCreate(route.params).map(dto => {
        //     const form = new RollcallForm(dto, this.service.settings);
        //     if (form.locked && !/\/lock$/.test(state.url)) {
        //         this.router.navigateByUrl(state.url.replace(/\/\w*$/, '/lock'));
        //     }
        //     return form;
        // });
    }
}
