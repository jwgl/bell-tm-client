import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { ObservationFormService } from '../../form.service';
import { ObservationFormEditorComponent } from '../form-editor.component';

import { ObservationCommonModule } from '../../../common/observation-common.module';
import { PipesModule } from '../../../shared/pipes/observation-pipes.module';

import { ObservePriorityListComponent } from './list/observe-priority.component';
import { QueryOptionDialog } from './list/query-option.dialog';
import { ScheduleListComponent } from './list/schedule-list.component';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleService } from './schedule.service';
import { WeekScheduleComponent } from './week/form-view.component';
import { IconModule } from 'core/icon';
import { NavModule } from './nav/nav.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        ScheduleRoutingModule,
        PipesModule,
        ObservationCommonModule,
        IconModule,
        NavModule,
    ],
    declarations: [
        ObservePriorityListComponent,
        QueryOptionDialog,
        ScheduleListComponent,
        ObservationFormEditorComponent,
        WeekScheduleComponent,
    ],
    providers: [
        Dialog,
        ScheduleService,
        ObservationFormService,
    ],
    entryComponents: [
        QueryOptionDialog,
    ],
    exports: [
        ObservationFormEditorComponent,
        ScheduleListComponent,
        WeekScheduleComponent,
    ],
})
export class ScheduleModule { }
