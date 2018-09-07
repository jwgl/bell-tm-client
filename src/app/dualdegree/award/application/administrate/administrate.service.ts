import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ApplicationsAdministrateService extends RestShowService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('AWARD_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadApplicationItem(id: any, options: {[key: string]: any} = {}): Observable<any> {
        return this.http.get(`${this.api.list()}/${options.awardId}/applications/${id}`);
    }

    loadApplicationList(options: {[key: string]: any} = {}): Observable<any> {
        return this.http.get(`${this.api.list()}/${options.awardId}/applications`);
    }
}
