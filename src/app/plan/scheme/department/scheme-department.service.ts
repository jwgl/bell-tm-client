import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class SchemeDepartmentService extends RestShowService {
    constructor(
        http: Http,
        @Inject('SCHEME_DEPARTMENT_API_URL') apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { departmentId: authService.userInfo.departmentId });
    }

    loadToes(id: string): Observable<any> {
        return this.http.get(`${this.api.item(id)}/toes`);
    }

    saveToes(id: string, toesDto: any) {
        return this.http.post(`${this.api.item(id)}/toes`, toesDto);
    }
}
