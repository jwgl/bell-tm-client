import { Injectable } from '@angular/core';
import { ApiUrl, Http } from 'core/rest';
import { Observable } from 'rxjs';

@Injectable()
export class UserScopeService {
    departmentApi: ApiUrl

    constructor(private http: Http) {
        this.departmentApi = new ApiUrl('/api/form/departments')
    }

    getDepartments(userType: number): Observable<any> {
        return this.http.get(this.departmentApi.list({userType}));
    }

    getAdminClasses(id: string): Observable<any> {
        return this.http.get(`${this.departmentApi.item(id)}/adminClasses`);
    }
}
