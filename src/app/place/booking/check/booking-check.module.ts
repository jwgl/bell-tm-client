import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { BookingSharedModule } from '../shared/booking-shared.module';
import { BookingCheckRoutingModule } from './booking-check.routing';
import { BookingCheckListComponent } from './check-list.component';
import { BookingCheckItemComponent } from './check-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/place/checkers/${userId}/bookings', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'done', label: '已审核', dateLabel: '审核时间' },
        ]),
        BookingSharedModule,
        BookingCheckRoutingModule,
    ],
    declarations: [
        BookingCheckListComponent,
        BookingCheckItemComponent,
    ],
})
export class BookingCheckModule { }
