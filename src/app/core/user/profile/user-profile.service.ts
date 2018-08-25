import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiUrl, Http } from 'core/rest';
import { AuthService } from 'core/auth';

@Injectable()
export class UserProfileService {
    api: ApiUrl;
    constructor(
        private http: Http,
        @Inject('USER_PROFILE_API_URL')
        apiUrl: string,
        authService: AuthService,
    ) {
        this.api = new ApiUrl(apiUrl, {userId: authService.userInfo.id});
    }

    loadList(): Observable<any> {
        return this.http.get(this.api.list());
    }

    updateUser(dto: any): Observable<void> {
        return this.http.put(this.api.list(), dto);
    }
}
