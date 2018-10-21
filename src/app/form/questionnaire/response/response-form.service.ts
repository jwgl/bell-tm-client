import { Inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Http, ApiUrl } from 'core/rest';
import { AuthService } from 'core/auth';


@Injectable()
export class ResponseFormService {
    api: ApiUrl;

    constructor(
        private http: Http,
        @Inject('RESPONDENT_QUESTIONNAIE_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        this.api = new ApiUrl(apiUrl, { userId: authService.userInfo.id });
    }

    loadData(questionnaireId: number): Observable<any> {
        return this.http.get(this.getReponseFormUrl(questionnaireId));
    }

    create(questionnaireId: number, value: any): Observable<any> {
        return this.http.post(this.getReponseFormUrl(questionnaireId), value);
    }

    update(questionnaireId: number, value: any): Observable<any> {
        return this.http.put(this.getReponseFormUrl(questionnaireId), value);
    }

    private getReponseFormUrl(questionnaireId: number): string {
        return `${this.api.item(questionnaireId)}/response`;
    }
}
