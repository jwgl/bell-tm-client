import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BaseDialog } from '../dialogs';
import { AuthService } from './auth.service';

@Component({
    styleUrls: ['./login.dialog.scss'],
    templateUrl: './login.dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class LoginDialog extends BaseDialog {
    username: string;
    password: string;
    errorMessage: string;

    constructor(
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
        this.authService.initSession();
        return null;
    }

    login() {
        this.errorMessage = null;
        this.authService.login(this.username, this.password).subscribe(() => {
            this.ok();
        }, (error) => {
            if (error instanceof HttpErrorResponse) {
                switch (error.status) {
                    case 401:
                        this.errorMessage = '用户名不存在或密码错误';
                        break;
                    case 503:
                        this.errorMessage = '请求过于频繁，请稍后再试';
                        break;
                    default:
                        this.errorMessage = error.message;
                        break;
                }
            }
        });
    }

    logout(): void {
        this.authService.logout();
    }
}
