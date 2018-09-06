import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { PipesModule } from '../../../shared/pipes/observation-pipes.module';
import { MyTeacherModule } from '../../../shared/utils/my-teacher.module';

import { ObservationSpecial } from './form.component';
import { TaskListComponent } from './task-list.component';
import { UnScheduleService } from './unschedule.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        MyTeacherModule,
        PipesModule,
        RouterModule,
    ],
    declarations: [
        ObservationSpecial,
        TaskListComponent,
    ],
    providers: [
        Dialog,
        UnScheduleService,
    ],
    exports: [
        ObservationSpecial,
        TaskListComponent,
    ],
})
export class UnScheduleModule { }
