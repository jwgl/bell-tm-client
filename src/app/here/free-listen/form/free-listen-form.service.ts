import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class FreeListenFormService extends RestEditService {
    private _settings: any;
    private _notice: string;

    constructor(
        http: Http,
        @Inject('FREE_LISTEN_FORM_API_URL')
        apiUrl: string,
        authService: AuthService,
        @Inject('FREE_LISTEN_VIEW_API_URL')
        private viewApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadSettings(): Observable<any> {
        if (this._settings) {
            return of(this._settings);
        } else {
            return this.http.get<object>(`${this.viewApiUrl}/settings`).pipe(tap(settings => this._settings = settings));
        }
    }

    loadNotice(): Observable<string> {
        if (this._notice) {
            return of(this._notice);
        } else {
            return this.http.get<{ notice: string }>(`${this.viewApiUrl}/notice`).pipe(
                tap(result => this._notice = result.notice),
                map(result => result.notice),
            );
        }
    }
}
