import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http } from 'core/rest';

@Injectable()
export class FreeListenCheckService {
    constructor(
        private http: Http,
        @Inject('FREE_LISTEN_VIEW_API_URL') private viewApiUrl: string,
    ) { }

    getSettings(): Observable<any> {
        return this.http.get<object>(`${this.viewApiUrl}/settings`);
    }
}
