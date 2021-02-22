import { Injectable, Inject } from '@angular/core';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class RoomScheduleService extends RestShowService {
    constructor(
        http: Http,
        @Inject('ROOM_SCHEDULE_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
