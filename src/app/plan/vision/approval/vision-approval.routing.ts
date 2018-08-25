import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { VisionApprovalItemComponent } from './approval-item.component';
import { VisionApprovalListComponent } from './approval-list.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            VisionApprovalListComponent,
            VisionApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class VisionApprovalRoutingModule { }
