import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { ObservationCommonModule } from '../common/observation-common.module';
import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { AppRoutingModule } from './observer-settings-routing.module';
import { ObserverListComponent } from './list/observer-list.component';
import { ObserverService } from './observer.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faTimes);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        HttpModule,
        AppRoutingModule,
        PipesModule,
        ObservationCommonModule,
        FontAwesomeModule,
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
