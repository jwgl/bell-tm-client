import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ObservationFormService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('OBSERVATION_FORM_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    cancel(id: number): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=CANCEL`, {});
    }

    submit(id: number): Observable<any> {
         return this.http.patch(`${this.api.item(id)}?op=SUBMIT`, {});
    }

    saveInIdle(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }

    feed(id: number): Observable<any> {
         return this.http.patch(`${this.api.item(id)}?op=FINISH`, {});
    }
}
