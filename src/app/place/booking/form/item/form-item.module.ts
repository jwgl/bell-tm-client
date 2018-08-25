import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { BookingSharedModule } from '../../shared/booking-shared.module';
import { BookingFormItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        BookingSharedModule,
    ],
    declarations: [
        BookingFormItemComponent,
    ],
    exports: [
        BookingFormItemComponent,
    ],
})
export class BookingFormItemModule { }
