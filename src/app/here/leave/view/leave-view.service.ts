import { Inject, Injectable } from '@angular/core';

import { Http, RestShowService } from 'core/rest';

@Injectable()
export class LeaveViewService extends RestShowService {
    constructor(
        http: Http,
        @Inject('LEAVE_VIEW_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl);
    }
}
