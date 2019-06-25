import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { ObservationRoutingModule } from './dean-routing.module';
import { ObservationFormService } from './dean.service';
import { DeanItemModule } from './item/item.module';
import { DeanListModule } from './list/form-list.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ObservationRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        PipesModule,
        DeanListModule,
        DeanItemModule,
    ],
    providers: [
        ObservationFormService,
        {provide: 'DEAN_API_URL', useValue: '/api/steer/users/${userId}/deans' },
    ],
})
export class DeanModule { }
