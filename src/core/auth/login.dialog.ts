import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BaseDialog } from '../dialogs';
import { AuthService } from './auth.service';

interface Csrf {
    headerName: string;
    token: string;
}

@Component({
    styleUrls: ['./login.dialog.scss'],
    templateUrl: './login.dialog.html',
})
export class LoginDialog extends BaseDialog {
    username: string;
    password: string;
    loginFailed: boolean;
    csrf: Csrf;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private authService: AuthService,
    ) {
        super();
        this.username = authService.userInfo.id;
    }

    onOpening(): Observable<any> {
        this.$modal.modal({
            backdrop: 'static',
            keyboard: false,
        });
        this.httpClient.get<{ csrf: Csrf }>('/uaa/login', {
            headers: new HttpHeaders({
                'X-Requested-With': 'XMLHttpRequest',
            }),
        }).subscribe(result => this.csrf = result.csrf);
        return null;
    }

    login() {
        const body = new HttpParams({
            fromObject: {
                username: this.username,
                password: this.password,
            }
        });

        this.httpClient.post('/uaa/login', body.toString(), {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
            }).set(this.csrf.headerName, this.csrf.token),
            responseType: 'text',
        }).subscribe(() => {
            this.ok();
        }, (error) => {
            if (error instanceof HttpErrorResponse) {
                switch (error.status) {
                    case 401:
                        if (error.url.endsWith('/login?error')) {
                            this.loginFailed = true;
                        }
                        break;
                }
            }

        });
    }

    logout(): void {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/ui/login']);
            this.close();
        });
    }
}
