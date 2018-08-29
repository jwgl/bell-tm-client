import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { TeacherSelectComponent } from '../common/teacher-select.component';
import { TypeTextPipe } from '../shared/pipes/observer-type';
import { TermTextPipe } from '../shared/pipes/term';

import { AppRoutingModule } from './app-routing.module';
import { ObserverListComponent } from './list/observer-list.component';
import { ObserverService } from './observer.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [
        Dialog,
        ObserverService,
        {provide: 'PUBLIC_API_URL', useValue: '/api/steer/settings'},
    ],
    declarations: [
        ObserverListComponent,
        TeacherSelectComponent,
        TermTextPipe,
        TypeTextPipe,
    ],
})
export class ObserverSettingsModule { }
