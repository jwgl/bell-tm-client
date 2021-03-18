import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http, RestEditService } from 'core/rest';
import { AuthService, UserInfo } from 'core/auth';

@Injectable()
export class BookingFormService extends RestEditService {
    userInfo: UserInfo;
    roomApi: ApiUrl;

    constructor(
        http: Http,
        @Inject('BOOKING_FORM_API_URL')
        apiUrl: string,
        @Inject('BOOKING_ROOM_API_URL')
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

    getNotice(): Observable<any> {
        return this.http.get<{ notice: string }>(`${this.api.list()}/notice`);
    }
}
