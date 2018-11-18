import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';
import { Misconduct } from './item/keep-item.model';

@Injectable()
export class BookingKeepService extends RestShowService {
    constructor(
        http: Http,
        @Inject('BOOKING_KEEP_API_URL')
        apiUrl: string,
        authService: AuthService,
        @Inject('MISCONDUCT_PICTURE_API_URL')
        private misconductPictureApiUrl,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    loadBuildings(): Observable<any> {
        return this.http.get(`${this.api.list()}/buildings`);
    }

    loadPlaces(building: String): Observable<any> {
        return this.http.get(`${this.api.list()}/places?building=${building}`);
    }

    loadFormForEdit(bookingItemId: number): Observable<any> {
        return this.http.get(`${this.api.item(bookingItemId)}/misconducts`);
    }

    createMisconduct(bookingItemId: number, misconduct: Misconduct): Observable<any> {
        return this.http.post(`${this.api.item(bookingItemId)}/misconducts`, misconduct);
    }

    updateMisconduct(bookingItemId: number, misconduct: Misconduct): Observable<void> {
        return this.http.put(`${this.api.item(bookingItemId)}/misconducts/${misconduct.id}`, misconduct);
    }

    deleteMisconduct(bookingItemId: number, misconduct: Misconduct): Observable<void> {
        return this.http.delete(`${this.api.item(bookingItemId)}/misconducts/${misconduct.id}`);
    }

    getPictureUrl(): string {
        return this.misconductPictureApiUrl;
    }
}
