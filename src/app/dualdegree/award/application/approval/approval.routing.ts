import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { ApplicationApprovalItemComponent } from './approval-item.component';
import { ApplicationApprovalListComponent } from './approval-list.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            ApplicationApprovalListComponent,
            ApplicationApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApplicationApprovalRoutingModule {}
