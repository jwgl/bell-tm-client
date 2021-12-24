import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class AreaService extends RestEditService {
    queryOptions: any;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('AREA_API_URL') apiUrl: string,
        @Inject('HINDFIELD_API_URL')
        private hindFieldApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    createHindField<T>(value: any): Observable<T> {
        return this.http.post<{ id: T }>(this.hindFieldApiUrl, value).pipe(map(data => data.id));
    }
}
