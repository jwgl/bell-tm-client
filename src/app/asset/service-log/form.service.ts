import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ServiceLogFormService extends RestEditService {
    constructor(
        http: Http,
        authService: AuthService,
        @Inject('SERVICELOG_FORM_API_URL') apiUrl: string,
        @Inject('HINDFIELD_API_URL')
        private hindFieldApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    findPlace(value: string): Observable<any[]> {
        return this.http.get(`${this.api.list()}/places?q=${encodeURIComponent(value)}`);
    }

    findContact(params?: { [param: string]: string | string[] }): Observable<any[]> {
        return this.http.get(`${this.api.list()}/contacts?`, params);
    }

    findAsset(params?: { [param: string]: string | string[] }): Observable<any[]> {
        return this.http.get(`${this.api.list()}/assets?`, params);
    }

    createHindField<T>(value: any): Observable<T> {
        return this.http.post<{ id: T }>(this.hindFieldApiUrl, value).pipe(map(data => data.id));
    }
}
