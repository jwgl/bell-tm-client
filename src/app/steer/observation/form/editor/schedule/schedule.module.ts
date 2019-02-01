import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { ObservationFormService } from '../../form.service';
import { ObservationFormEditorComponent } from '../form-editor.component';

import { PlaceSelectModule } from '../../../common/observation-common.module';
import { PipesModule } from '../../../shared/pipes/observation-pipes.module';

import { ObservePriorityListComponent } from './list/observe-priority.component';
import { QueryOptionDialog } from './list/query-option.dialog';
import { ScheduleListComponent } from './list/schedule-list.component';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleService } from './schedule.service';
import { WeekScheduleComponent } from './week/form-view.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        ScheduleRoutingModule,
        PipesModule,
        PlaceSelectModule,
        FontAwesomeModule,
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
