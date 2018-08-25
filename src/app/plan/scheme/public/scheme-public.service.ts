import { Injectable, Inject } from '@angular/core';

import { Http, RestShowService } from 'core/rest';

@Injectable()
export class SchemePublicService extends RestShowService {
    constructor(http: Http, @Inject('SCHEME_PUBLIC_API_URL') apiUrl: string) {
        super(http, apiUrl);
    }
}
