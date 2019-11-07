import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class AwardFormService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('AWARD_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { departmentId: authService.userInfo.departmentId });
    }

    save(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }

    toggle(id: number, key: string): Observable<void> {
        return this.http.patch(`${this.api.item(id)}?key=${key}`, {});
    }
}
