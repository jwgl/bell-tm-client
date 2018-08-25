import { Inject, Injectable } from '@angular/core';

import { Http, RestShowService } from 'core/rest';

@Injectable()
export class FreeListenViewService extends RestShowService {
    constructor(
        http: Http,
        @Inject('FREE_LISTEN_VIEW_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl);
    }
}
