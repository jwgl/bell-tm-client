import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http } from 'core/rest';

@Injectable()
export class FundViewService {

    constructor(
        private http: Http,
        @Inject('FUND_API_URL')
        private fundApiUrl: string,
    ) {}

    loadFunds(id: number): Observable<any> {
        return this.http.get(`${this.fundApiUrl}/${id}`);
    }
}
