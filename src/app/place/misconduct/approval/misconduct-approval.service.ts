import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class MisconductApprovalService extends RestShowService {
    constructor(
        http: Http,
        @Inject('MISCONDUCT_APPROVAL_API_URL')
        apiUrl: string,
        authService: AuthService,
        @Inject('MISCONDUCT_PICTURE_API_URL')
        private misconductPictureApiUrl,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    getPictureUrl(): string {
        return this.misconductPictureApiUrl;
    }
}
