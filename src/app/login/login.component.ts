import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'core/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
    username: string;
    password: string;
    errorMessage: string;

    @ViewChild('u') usernameRef: ElementRef;

    constructor(
        public router: Router,
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.authService.initSession();
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.usernameRef.nativeElement.focus();
        }, 0);
    }

    login() {
        this.errorMessage = null;
        this.authService.login(this.username, this.password).subscribe(() => {
            if (this.authService.isLoggedIn) {
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
                this.router.navigateByUrl(redirect);
            }
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
            console.log(this.errorMessage)
            console.log(error)
        });
    }
}
