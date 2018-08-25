import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonDirectivesModule } from '../common-directives';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthService } from './auth.service';
import { LoginService } from './login.service';
import { LoginDialog } from './login.dialog';

export {
    AuthService,
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        FontAwesomeModule,
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
