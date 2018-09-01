import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../shared/pipes/observation-pipes.module';

import { ScheduleModule } from './editor/schedule/schedule.module';
import { UnScheduleModule } from './editor/unschedule/unschedule.module';
import { ObservationRoutingModule } from './form-routing.module';
import { ObservationFormService } from './form.service';
import { ObservationItemComponent } from './item/item.component';
import { ObservationFormListModule } from './list/form-list.module';
import { ObservationFormViewerModule } from './shared/form-viewer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ObservationRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        ScheduleModule,
        UnScheduleModule,
        PipesModule,
        ObservationFormListModule,
        ObservationFormViewerModule,
    ],
    declarations: [
        ObservationItemComponent,
    ],
    providers: [
        ObservationFormService,
        {provide: 'OBSERVATION_FORM_API_URL', useValue: '/api/steer/users/${userId}/observations' },
        {provide: 'TEACHER_TIMESLOT_API_URL', useValue: '/api/steer/teachers'},
        {provide: 'PLACE_TIMESLOT_API_URL', useValue: '/api/steer/places'},
        {provide: 'SCHEDULE_API_URL', useValue: '/api/steer/schedules'},
        {provide: 'UNSCHEDULE_API_URL', useValue: '/api/steer/unschedules'},
    ],
})
export class ObservationFormModule { }
