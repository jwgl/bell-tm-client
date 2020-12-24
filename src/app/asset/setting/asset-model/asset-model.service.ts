import { Inject, Injectable } from '@angular/core';

import { Http, RestEditService } from 'core/rest';

@Injectable()
export class AssetModelService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        @Inject('MODEL_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl);
    }
}
