import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ReissueFormService extends RestEditService {
    private _notice: string;

    constructor(
        http: Http,
        @Inject('CARD_REISSUE_FORM_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadNotice(): Observable<string> {
        if (this._notice) {
            return of(this._notice);
        } else {
            return this.http.get<{ notice: string }>(`${this.api.list()}/notice`).pipe(
                tap(result => this._notice = result.notice),
                map(result => result.notice),
            );
        }
    }

    loadPicture(): Observable<string> {
        return this.http.get<{ warning: string }>(`${this.api.list()}/picture`).pipe(
            map(result => result ? result.warning : null),
        );
    }

    loadSettings(): Observable<{ maxCount: number }> {
        return this.http.get<{ maxCount: number }>(`${this.api.list()}/settings`);
    }
}
