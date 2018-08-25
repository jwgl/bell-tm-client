import { Injectable, Inject } from '@angular/core';

import { Http, RestShowService } from 'core/rest';

@Injectable()
export class VisionPublicService extends RestShowService {
    constructor(http: Http, @Inject('VISION_PUBLIC_API_URL') apiUrl: string) {
        super(http, apiUrl);
    }
}
