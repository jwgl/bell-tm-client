import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http, RestShowService } from 'core/rest';

@Injectable()
export class SchemeAdminService extends RestShowService {
    departmentApi: ApiUrl;

    constructor(
        http: Http,
        @Inject('SCHEME_ADMIN_API_URL') apiUrl: string,
        @Inject('DEPARTMENT_API_URL') departemtApiUrl: string,
    ) {
        super(http, apiUrl);
        this.departmentApi = new ApiUrl(departemtApiUrl);
    }

    loadDepartments(): Observable<any[]> {
        return this.http.get(this.departmentApi.list());
    }

    loadGrades(departmentId: string): Observable<number[]> {
        return this.http.get(`${this.departmentApi.item(departmentId)}/grades`);
    }
}
