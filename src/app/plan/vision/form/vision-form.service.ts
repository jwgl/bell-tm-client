import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class VisionFormService extends RestEditService {
    private importVisionApi: ApiUrl;

    constructor(
        http: Http,
        @Inject('VISION_FORM_API_URL') apiUrl: string,
        authService: AuthService,
        @Inject('VISION_IMPORT_API_URL') visionImportApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.importVisionApi = new ApiUrl(visionImportApiUrl);
    }

    loadDataForImport(id: string): Observable<any> {
        return this.http.get(this.importVisionApi.item(id));
    }
}
