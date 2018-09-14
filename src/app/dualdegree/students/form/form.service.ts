import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class StudentAdminFormService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('STUDENT_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { departmentId: authService.userInfo.departmentId });
    }

    batchSave(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.http.post(this.api.list(), form);
        }
    }
}
