import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http } from 'core/rest';

@Injectable()
export class NavbarService {
    constructor(
        private http: Http,
        @Inject('MENU_API_URL') private menuApiUrl: string,
    ) { }

    loadList(groups: string[]): Observable<any> {
        const queryString = groups.map(group => `group=${group}`).join('&');
        return this.http.get(`${this.menuApiUrl}?${queryString}`);
    }
}
