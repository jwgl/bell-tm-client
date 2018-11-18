import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Http, RestShowService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class MisconductApprovalService extends RestShowService {
    counts: { [key: number]: number } = {};

    constructor(
        http: Http,
        @Inject('MISCONDUCT_APPROVAL_API_URL')
        apiUrl: string,
        authService: AuthService,
        @Inject('MISCONDUCT_PICTURE_API_URL')
        private misconductPictureApiUrl,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    getPictureUrl(): string {
        return this.misconductPictureApiUrl;
    }

    updateStatus(id: number, status: number, outcome: String): Observable<any> {
        return this.http.patch<{ count: number }>(this.api.item(id), { status, outcome }).pipe(tap(result => {
            this.counts[status] = result.count;
        }));
    }

    loadCounts() {
        this.http.get<{ [key: number]: number }>(`${this.api.list()}/counts`).subscribe(counts => this.counts = counts);
    }
}
