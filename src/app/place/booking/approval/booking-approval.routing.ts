import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings, WORKFLOW_CONTAINTER_QUERYABLE } from 'core/workflow';

import { BookingApprovalListComponent } from './approval-list.component';
import { BookingApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            BookingApprovalListComponent,
            BookingApprovalItemComponent,
            WORKFLOW_CONTAINTER_QUERYABLE,
        )),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        { provide: WORKFLOW_CONTAINTER_QUERYABLE, useValue: () => ({ queryable: true }) },
    ]
})
export class BookingApprovalRoutingModule { }
