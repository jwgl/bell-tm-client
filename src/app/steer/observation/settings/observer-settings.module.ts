import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { AppRoutingModule } from './observer-settings-routing.module';
import { ObserverListComponent } from './list/observer-list.component';
import { ObserverService } from './observer.service';
import { IconModule } from 'core/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        AppRoutingModule,
        PipesModule,
        IconModule,
    ],
    providers: [
        Dialog,
        ObserverService,
        {provide: 'OBSERVER_API_URL', useValue: '/api/steer/settings'},
    ],
    declarations: [
        ObserverListComponent,
    ],
})
export class ObserverSettingsModule { }
