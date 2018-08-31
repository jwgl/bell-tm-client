import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { ObservationFormService } from '../../form.service';
import { ObservationFormEditorComponent } from '../form-editor.component';

import { PlaceSelectComponent } from '../../../common/place-select.component';
import { TeacherSelectComponent } from '../../../common/teacher-select.component';
import { PipesModule } from '../../../shared/pipes/observation-pipes.module';

import { ObservePriorityListComponent } from './list/observe-priority.component';
import { QueryOptionDialog } from './list/query-option.dialog';
import { ScheduleListComponent } from './list/schedule-list.component';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleViewComponent } from './schedule.component';
import { ScheduleService } from './schedule.service';
import { WeekScheduleComponent } from './week/form-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        ScheduleRoutingModule,
        PipesModule,
    ],
    declarations: [
        ScheduleViewComponent,
        TeacherSelectComponent,
        ObservePriorityListComponent,
        PlaceSelectComponent,
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
        ScheduleViewComponent,
        WeekScheduleComponent,
    ],
})
export class ScheduleModule { }
