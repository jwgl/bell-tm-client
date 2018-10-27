import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class QuestionnaireFormService extends RestEditService {
    constructor(
        http: Http,
        @Inject('QUESTIONNAIRE_FORM_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadCreateOptions(): Observable<any> {
        return this.http.get(`${this.api.list()}/createOptions`);
    }

    togglePublished(id: number, publish: boolean): Observable<string> {
        return this.http.patch<{ hashId: string }>(`${this.api.item(id)}?op=${publish ? 'OPEN' : 'CLOSE'}`, null).pipe(map(data => data.hashId));
    }

    loadResponses(id: number): Observable<any> {
        return this.http.get(`${this.api.item(id)}/responses`);
    }

    loadOpenResponses(id: number, questionId: number): Observable<any> {
        return this.http.get(`${this.api.item(id)}/questions/${questionId}/openResponses`);
    }
}
