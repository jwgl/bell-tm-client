import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Http, RestEditService } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class ChangeFormService extends RestEditService {
    list: any[];

    constructor(
        http: Http,
        authService: AuthService,
        @Inject('CHANGE_API_URL')
        apiUrl: string,
    ) {
        super(http, apiUrl, { userId: authService.userInfo.id });
    }

    getUploadUrl(): string {
        return `/zuul${this.api.list()}/upload`;
    }

    loadProject<T>(id: number): Observable<T> {
        return this.http.get<T>(`${this.api.list()}/project?id=${id}`);
    }
}
