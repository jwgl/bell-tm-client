import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

export interface UserInfo {
    id: string;
    name: string;
    type: string;
    phoneNumber: string;
    departmentId: string;
    roles: string[];
    perms: string[];
}

const JsonHeader = new HttpHeaders({
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
});

@Injectable()
export class AuthService {
    userInfo: UserInfo = null;
    csrf: any;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private httpClient: HttpClient) {
        this.userInfo = JSON.parse(sessionStorage.getItem('user'));
    }

    get isLoggedIn(): boolean {
        return this.userInfo !== null;
    }

    initSession(): void {
        this.logout(false);
    }

    login(username: string, password: string): Observable<boolean> {
        const body = new HttpParams({
            fromObject: {
                username,
                password,
            },
        });
        return this.httpClient.post('/uaa/login', body.toString(), {
            headers: JsonHeader
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set(this.csrf.headerName, this.csrf.token),
            responseType: 'text',
        }).pipe(
            switchMap(result => {
                return this.httpClient.get<{ user: UserInfo }>('/api/user', { headers: JsonHeader });
            }), tap((result) => {
                this.userInfo = result.user;
                sessionStorage.setItem('user', JSON.stringify(this.userInfo));
            }), map(() => {
                return true;
            }),
        );
    }

    logout(redirect = true) {
        return this.httpClient.post('/logout', null, {
            headers: JsonHeader,
            withCredentials: true,
        }).subscribe(result => {
            sessionStorage.removeItem('user');
            this.userInfo = null;
            if (redirect) {
                window.location.href = '/';
            } else {
                this.csrf = result['csrf'];
            }
        });
    }

    updatePhoneNumber(phoneNumber: string): void {
        this.userInfo.phoneNumber = phoneNumber;
        sessionStorage.setItem('user', JSON.stringify(this.userInfo));
    }
}
