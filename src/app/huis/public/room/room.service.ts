import { Injectable, Inject } from '@angular/core';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class PublicRoomService extends RestShowService {
    constructor(
        http: Http,
        @Inject('PUBLIC_ROOM_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }
}
