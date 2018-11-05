import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { BookingSharedModule } from '../shared/booking-shared.module';
import { BookingApprovalRoutingModule } from './booking-approval.routing';
import { BookingApprovalListComponent } from './approval-list.component';
import { BookingApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/place/approvers/${userId}/bookings', [
            { type: 'todo', label: '待审批', dateLabel: '审核时间' },
            { type: 'done', label: '已审批', dateLabel: '审批时间' },
            { type: 'tobe', label: '未审核', dateLabel: '申请时间' },
        ]),
        BookingApprovalRoutingModule,
        BookingSharedModule,
    ],
    declarations: [
        BookingApprovalListComponent,
        BookingApprovalItemComponent,
    ],
})
export class BookingApprovalModule { }
