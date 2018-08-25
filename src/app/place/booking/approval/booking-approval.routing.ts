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
            { queryable: WORKFLOW_CONTAINTER_QUERYABLE },
        )),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        { provide: WORKFLOW_CONTAINTER_QUERYABLE, useValue: () => true },
    ]
})
export class BookingApprovalRoutingModule { }
