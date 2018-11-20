import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AdminClassAttendanceService } from './admin-class-attendance.service';

@Injectable()
export class AdminClassAttendanceContainerResolve implements Resolve<{ terms: number[], termId: number, adminClasses: any[] }> {
    constructor(private service: AdminClassAttendanceService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
        terms: number[], termId: number, adminClasses: any[]
    }> {
        return this.service.loadTerms().pipe(
            map(terms => {
                if (route.params['termId']) {
                    return {
                        terms: terms,
                        termId: +route.params['termId'],
                    };
                } else {
                    this.router.navigateByUrl(state.url.replace('/adminClasses/', `/adminClasses;termId=${terms[0]}/`));
                    return null;
                }
            }),
            switchMap(result => {
                if (result) {
                    return this.service.loadAdminClasses(result.termId).pipe(
                        map(adminClasses => ({
                            ...result,
                            adminClasses: adminClasses,
                        }))
                    );
                } else {
                    return of(null);
                }
            }),
            map(result => {
                const id = route.firstChild.params['id'];
                if (result) {
                    if (id === 'all' || result.adminClasses.find(it => it.id === id)) {
                        return result;
                    } else {
                        this.router.navigateByUrl(state.url.replace(id, 'all'));
                        return null;
                    }
                } else {
                    return null;
                }
            }),
        );
    }
}
