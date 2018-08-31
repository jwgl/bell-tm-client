import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { TeacherSelectComponent } from '../common/teacher-select.component';
import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { AppRoutingModule } from './observer-settings-routing.module';
import { ObserverListComponent } from './list/observer-list.component';
import { ObserverService } from './observer.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        HttpModule,
        AppRoutingModule,
        PipesModule,
    ],
    providers: [
        Dialog,
        ObserverService,
        {provide: 'OBSERVER_API_URL', useValue: '/api/steer/settings'},
    ],
    declarations: [
        ObserverListComponent,
        TeacherSelectComponent,
    ],
})
export class ObserverSettingsModule { }
