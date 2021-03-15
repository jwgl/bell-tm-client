import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { buildReviewRoutings, Workflow2Module } from 'core/workflow2';

import { BookingSharedModule } from '../shared/booking-shared.module';
import { BookingFormViewerComponent } from '../shared/form-viewer.component';
import { BookingForm } from '../shared/booking-form.model';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        BookingSharedModule,
        RouterModule.forChild(buildReviewRoutings()),
        Workflow2Module.forReview(
            '/api/huis/users/${userId}/bookingTasks',
            '/api/huis/users/${userId}/bookingSteps',
            BookingFormViewerComponent,
            BookingForm,
        ),
    ],
})
export class BookingTaskModule { }
