import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class TodoService extends RestShowService {
    constructor(
        http: Http,
        @Inject('TODO_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadCounts(): Observable<any> {
        return this.http.get(`${this.api.list()}/counts`);
    }

    updateReceived(id: string): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=RECEIVED`, {});
    }
}
