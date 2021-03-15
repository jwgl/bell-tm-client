import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ApiUrl, Http, RestEditService } from 'core/rest';
import { AuthService, UserInfo } from 'core/auth';

@Injectable()
export class OperationFormService extends RestEditService {
    userInfo: UserInfo;
    roomApi: ApiUrl;
    notice: string;

    constructor(
        http: Http,
        @Inject('OPERATION_FORM_API_URL')
        apiUrl: string,
        @Inject('OPERATION_ROOM_API_URL')
        roomUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.userInfo = authService.userInfo;
        this.roomApi = new ApiUrl(roomUrl, { userId: authService.userInfo.id });
    }

    loadRooms(): Observable<any> {
        return this.http.get(this.roomApi.list());
    }

    loadRoom(id: number): Observable<any> {
        return this.http.get(this.roomApi.item(id));
    }

    getNotice(): Observable<string> {
        if (this.notice) {
            return of(this.notice);
        } else {
            return this.http.get<{ notice: string }>(`${this.api.list()}/notice`).pipe(
                map(result => result.notice),
                tap(notice => this.notice = notice),
            );
        }
    }
}
