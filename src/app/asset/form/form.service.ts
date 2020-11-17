import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class AssetFormService extends RestEditService {
    constructor(
        http: Http,
        authService: AuthService,
        @Inject('RECEIPT_FORM_API_URL') apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    submit(id: number, options: any): Observable<any> {
        return this.http.patch(`${this.api.item(id)}?op=SUBMIT`, options);
   }
}
