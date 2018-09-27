import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';
@Injectable()
export class UniversityFormService extends RestEditService {
    list: any[];
    filters: any;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('UNIVERSITY_FORM_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    save(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }
}
