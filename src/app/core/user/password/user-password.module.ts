import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';

import { UserPasswordComponent } from './user-password.component';
import { UserPasswordRoutingModule } from './user-password.routing';
import { UserPasswordService } from './user-password.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        UserPasswordRoutingModule,
    ],
    declarations: [
        UserPasswordComponent,
    ],
    providers: [
        UserPasswordService,
        { provide: 'USER_PASSWORD_API_URL', useValue: '/api/core/users/${userId}/password' },
    ],
})
export class UserPasswordModule { }
