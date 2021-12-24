import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class RoomFormService extends RestEditService {
    userId: string;

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('ROOM_API_URL')
        apiUrl: string,
        @Inject('LABEL_API_URL')
        private labelApiUrl: string,
        @Inject('LABELLING_API_URL')
        private labellingApiUrl: string,
        @Inject('HINDFIELD_API_URL')
        private hindFieldApiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
        this.labelApiUrl = this.labelApiUrl.replace('${userId}', authService.userInfo.id);
        this.labellingApiUrl = this.labellingApiUrl.replace('${userId}', authService.userInfo.id);
        this.userId = authService.userInfo.id;
    }

    createLabel<T>(value: any): Observable<T> {
        return this.http.post<{ id: T }>(this.labelApiUrl, value).pipe(map(data => data.id));
    }

    createRoomLabel<T>(value: any): Observable<T> {
        return this.http.post<{ id: T }>(this.labellingApiUrl, value).pipe(map(data => data.id));
    }

    createHindField<T>(value: any): Observable<T> {
        return this.http.post<{ id: T }>(this.hindFieldApiUrl, value).pipe(map(data => data.id));
    }
}
