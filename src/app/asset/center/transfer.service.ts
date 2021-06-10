import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class TransferFormService extends RestEditService {
    queryOptions: any;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('SCRAP_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    getUploadUrl(): string {
        return `/zuul${this.api.list()}/upload`;
    }
}
