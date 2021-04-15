import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http, RestEditService } from 'core/rest';
import { AuthService, UserInfo } from 'core/auth';

@Injectable()
export class OperationFormService extends RestEditService {
    userInfo: UserInfo;
    roomApi: ApiUrl;
    notice: string;

    constructor(
        http: Http,
        @Inject('OPERATION_FORM_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.userInfo = authService.userInfo;
    }

    updateUsage(id: number, used: boolean): Observable<void> {
        return this.http.patch(`${this.api.item(id)}/usage`, { used });
    }
}
