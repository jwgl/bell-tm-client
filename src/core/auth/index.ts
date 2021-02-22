import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonDirectivesModule } from '../common-directives';

import { AuthService, UserInfo } from './auth.service';
import { LoginService } from './login.service';
import { LoginDialog } from './login.dialog';
import { IconModule } from 'core/icon';

export {
    AuthService,
    UserInfo,
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        IconModule,
        CommonDirectivesModule,
    ],
    declarations: [
        LoginDialog,
    ],
    entryComponents: [
        LoginDialog,
    ],
    providers: [
        AuthService,
        LoginService,
    ]
})
export class AuthModule { }
