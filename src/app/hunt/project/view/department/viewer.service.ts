import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ProjectDepartmentService extends RestEditService {
    list: any[];
    queryOptions: any;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('PROJECT_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    getDownloadUrl(id: number): string {
        return `${this.api.item(id)}/attachments`;
    }
}
