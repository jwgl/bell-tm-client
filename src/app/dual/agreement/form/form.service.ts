import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';
@Injectable()
export class AgreementFormService extends RestEditService {
    list: any[];
    filters: any;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('AGREEMENT_FORM_API_URL')
        apiUrl: string,
        @Inject('AGREEMENT_CARRYOUT_API_URL')
        private carryoutApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.carryoutApiUrl = this.carryoutApiUrl.replace('${userId}', authService.userInfo.id);
    }

    save(id: number, form: any): Observable<any> {
        if (id) {
            return this.update(id, form);
        } else {
            return this.create(form);
        }
    }

    getCoMajors(id: number): Observable<any> {
        return this.http.get<object>(`${this.api.list()}/cooperativeMajors?universityId=${id}`);
    }

    loadCarryouts(): Observable<any> {
        return this.http.get<object>(this.carryoutApiUrl);
    }

    doCarryout(value: any): Observable<string> {
        return this.http.post(this.carryoutApiUrl, value).pipe(
            map((data: any) => data.id)
        );
    }
}
