import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { FreeListenCheckService } from './free-listen-check.service';
import { map } from 'rxjs/operators';

@Injectable()
export class FreeListenCheckResolve implements Resolve<any> {
    constructor(private service: FreeListenCheckService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.service.getSettings().pipe(map(settings => {
            return {
                notice: `审核时间：${settings.checkStartDate} 至 ${settings.checkEndDate}`,
            };
        }));
    }
}
