import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http, RestEditService} from 'core/rest';

@Injectable()
export class BookingReportService extends RestEditService {
    private bookingApi: ApiUrl;

    constructor(
        http: Http,
        @Inject('BOOKING_REPORT_API_URL')
        apiUrl: string,
        @Inject('BOOKING_API_URL')
        bookingApiUrl: string,
    ) {
        super(http, apiUrl);
        this.bookingApi = new ApiUrl(bookingApiUrl);
    }

    unreportedForms(): Observable<any> {
        return this.http.get(`${this.api.list()}/unreportedForms`);
    }

    loadForm(formId: number): Observable<any> {
        return this.http.get(this.bookingApi.item(formId));
    }
}
