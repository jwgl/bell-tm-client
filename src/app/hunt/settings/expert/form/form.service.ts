import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';
@Injectable()
export class ExpertFormService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('EXPERTS_API_URL') apiUrl: string,
        @Inject('TEAM_API_URL')
        private teamApi: string,
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

    makeTeam(value: any): Observable<any> {
        return this.http.post(this.teamApi, value);
    }

    loadTeam(): Observable<any> {
        return this.http.get(this.teamApi);
    }

    dismiss(id: number): Observable<any> {
        return this.http.delete(`${this.teamApi}/${id}`);
    }
}
