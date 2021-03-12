import { Injectable, Inject } from '@angular/core';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';
import { Observable } from 'rxjs';

@Injectable()
export class RoomSettingService extends RestShowService {
    constructor(
        http: Http,
        @Inject('ROOM_SETTING_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { departmentId: authService.userInfo.departmentId });
    }

    createReservation(roomId: number, data: any): Observable<{ id: number }> {
        return this.http.post<{ id: number }>(`${this.api.item(roomId)}/reservations`, data)
    }

    deleteReservation(roomId: number, id: number): Observable<void> {
        return this.http.delete(`${this.api.item(roomId)}/reservations/${id}`)
    }

    loadSchedules(roomId: number, start: string, end: string): Observable<any> {
        return this.http.get(`${this.api.item(roomId)}/schedules`, { start, end });
    }
}
