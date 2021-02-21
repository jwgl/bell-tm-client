import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';
import { Workflow2Module } from 'core/workflow2';

import { BookingSharedModule } from '../shared/booking-shared.module';
import { BookingTaskRoutingModule } from './booking-task.routing';
import { BookingTaskListComponent } from './task-list.component';
import { BookingTaskItemComponent } from './task-item.component';
import { BookingTaskService } from './booking-task.service';
import { BookingStepService } from './booking-step.service';
import { BookingFormEditorModule } from '../form/editor/form-editor.module';
import { IconModule } from 'core/icon';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        IconModule,
        // Workflow2Module.forReview('/api/huis/users/${userId}/bookingTasks'),
        BookingTaskRoutingModule,
        BookingSharedModule,
        BookingFormEditorModule
    ],
    declarations: [
        BookingTaskListComponent,
        BookingTaskItemComponent,
    ],
    providers: [
        BookingTaskService,
        BookingStepService,
        { provide: 'BOOKING_TASK_API_URL', useValue: '/api/huis/users/${userId}/bookingTasks' },
        { provide: 'BOOKING_STEP_API_URL', useValue: '/api/huis/users/${userId}/bookingSteps' },
    ],
})
export class BookingTaskModule { }
