import { Inject, Injectable } from '@angular/core';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ReviewService extends RestShowService {
    constructor(
        http: Http,
        authService: AuthService,
        @Inject('REVIEW_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    getDownloadUrl(id: number): string {
        return `${this.api.item(id)}/attachments`;
    }
}
