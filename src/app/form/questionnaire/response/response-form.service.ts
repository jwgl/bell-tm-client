import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

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

    create(questionnaireId: number, value: any, submit: boolean): Observable<any> {
        return this.http.post(this.getReponseFormUrl(questionnaireId), value, { submit: `${submit}` });
    }

    update(questionnaireId: number, value: any, submit: boolean): Observable<any> {
        return this.http.put(this.getReponseFormUrl(questionnaireId), value, { submit: `${submit}` });
    }

    private getReponseFormUrl(questionnaireId: number): string {
        return `${this.api.item(questionnaireId)}/response`;
    }
}
