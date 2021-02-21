import { Inject, Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { ApiUrl, Http, RestEditService } from 'core/rest';
import { AuthService, UserInfo } from 'core/auth';

@Injectable()
export class StatementFormService extends RestEditService {
    userInfo: UserInfo;
    roomApi: ApiUrl;
    notice: string;

    constructor(
        http: Http,
        @Inject('STATEMENT_FORM_API_URL')
        apiUrl: string,
        @Inject('STATEMENT_ITEM_API_URL')
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
}
