import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { ReissueApprovalListComponent } from './approval-list.component';
import { ReissueApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            ReissueApprovalListComponent,
            ReissueApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class ReissueApprovalRoutingModule { }
