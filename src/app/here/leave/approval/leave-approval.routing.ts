import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { LeaveApprovalItemComponent } from './approval-item.component';
import { LeaveApprovalListComponent } from './approval-list.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            LeaveApprovalListComponent,
            LeaveApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class LeaveApprovalRoutingModule { }
