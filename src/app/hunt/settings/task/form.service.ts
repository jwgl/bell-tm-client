import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class FormService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('TASK_API_URL') apiUrl: string,
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

    loadDataForProjectOptions<T>(id: number): Observable<any> {
        return this.http.get<T>(`${this.api.item(id)}/projects/create`);
    }

    loadProjects<T>(id: number, params?: { [param: string]: string | string[] }): Observable<any> {
        return this.http.get<T>(`${this.api.item(id)}/projects`, params);
    }
}
