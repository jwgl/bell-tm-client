import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ObserverService extends RestEditService {
    constructor(
        http: Http,
        @Inject('OBSERVER_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { departmentId: authService.userInfo.departmentId });
    }

    observerReport(): Observable<any> {
        return this.http.get(`${this.api.list()}/countByObserver`);
    }
}
