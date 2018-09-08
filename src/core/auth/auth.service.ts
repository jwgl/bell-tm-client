import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

interface Csrf {
    headerName: string;
    token: string;
}

interface UserInfo {
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

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private httpClient: HttpClient) {
        this.userInfo = JSON.parse(sessionStorage.getItem('user'));
    }

    login(username: string, password: string): Observable<boolean> {
        return this.httpClient.get('/uaa/login', { headers: JsonHeader }).pipe(
            switchMap(result => {
                const csrf = result['csrf'];
                const body = new HttpParams({
                    fromObject: {
                        username,
                        password,
                    },
                });
                return this.httpClient.post('/uaa/login', body.toString(), {
                    headers: JsonHeader
                        .set('Content-Type', 'application/x-www-form-urlencoded')
                        .set(csrf.headerName, csrf.token),
                    responseType: 'text',
                });
            }), switchMap(result => {
                return this.httpClient.get<{ user: UserInfo }>('/api/user', { headers: JsonHeader });
            }), tap((result) => {
                this.userInfo = result.user;
                sessionStorage.setItem('user', JSON.stringify(this.userInfo));
            }), map(() => {
                return true;
            }),
        );
    }

    logout(): Observable<any> {
        return this.httpClient.post('/logout', null, {
            headers: JsonHeader,
            responseType: 'text',
            withCredentials: true,
        }).pipe(
            tap(() => {
                this.userInfo = null;
                sessionStorage.removeItem('user');
            }),
        );
    }

    invalidateSession(): void {
        this.httpClient.get('/api/user', { headers: JsonHeader }).subscribe(() => {
            this.logout().subscribe(() => { });
        }, error => { });
    }

    get isLoggedIn(): boolean {
        return this.userInfo !== null;
    }
}
