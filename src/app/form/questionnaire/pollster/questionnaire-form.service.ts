import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';
import { Observable } from 'rxjs';

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

    togglePublished(id: number, publish: boolean): Observable<void> {
        return this.http.patch(`${this.api.item(id)}?op=${publish ? 'OPEN': 'CLOSE'}`, null)
    }
}
