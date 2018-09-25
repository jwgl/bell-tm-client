import { Inject, Injectable } from '@angular/core';

import { Http, RestShowService } from 'core/rest';

@Injectable()
export class FinderService extends RestShowService {

    constructor(
        http: Http,
        @Inject('FINDER_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl);
    }
}
