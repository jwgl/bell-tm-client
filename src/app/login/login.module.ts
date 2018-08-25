import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CommonDirectivesModule } from 'core/common-directives';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        CommonDirectivesModule,
        FormsModule,
        FontAwesomeModule,
    ],
})
export class LoginModule { }
