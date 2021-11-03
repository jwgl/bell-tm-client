import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class BookingAdminService extends RestEditService {
    constructor(
        http: Http,
        @Inject('BOOKING_ADMIN_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        super(http, apiUrl, { departmentId: authService.userInfo.departmentId });
    }

    revoke(id: any): Observable<any> {
        return this.http.patch(`${this.api.item(id)}/revoke`, {});
    }

    revokeItem(id: any, itemId: any, revoke: boolean): Observable<any> {
        return this.http.patch(`${this.api.item(id)}/revoke/${itemId}`, {revoke});
    }

    listUnsettledFacilities(): Observable<any> {
        return this.http.get(`${this.api.list()}/unsettledFacilities`);
    }
}
