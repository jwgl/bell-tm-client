import { Inject, Injectable } from '@angular/core';

import { ApiUrl, Http, RestEditService } from 'core/rest';
import { Observable } from 'rxjs';

@Injectable()
export class ReissueOrderService extends RestEditService {
    private reissueApi: ApiUrl;

    constructor(
        http: Http,
        @Inject('REISSUE_ORDER_API_URL')
        apiUrl: string,
        @Inject('REISSUE_API_URL')
        reissueApiUrl: string,
    ) {
        super(http, apiUrl);
        this.reissueApi = new ApiUrl(reissueApiUrl);
    }

    receive(id: number, formId: number, received: boolean) {
        return this.http.patch<{ status: string }>(`${this.api.item(id)}`, { type: 'RECEIVE', formId, received });
    }

    receiveAll(id: number, received: boolean) {
        return this.http.patch<{ status: string }>(`${this.api.item(id)}`, { type: 'RECEIVE_ALL', received });
    }

    uporderedForms(): Observable<any[]> {
        return this.http.get(`${this.api.list()}/unorderedForms`);
    }

    loadForm(formId: number): Observable<any> {
        return this.http.get(this.reissueApi.item(formId));
    }
}
