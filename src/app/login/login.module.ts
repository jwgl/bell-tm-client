import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

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
export class LoginModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faUser, faLock);
    }
}
