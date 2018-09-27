import { Inject, Injectable } from '@angular/core';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';
@Injectable()
@Injectable()
export class PublicDepartmentService extends RestShowService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('PUBLIC_DEPARTMENT_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { departmentId: authService.userInfo.departmentId });
    }
}
