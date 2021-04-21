import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { ApprovalListComponent } from './approval-list.component';
import { ApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            ApprovalListComponent,
            ApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApprovalRoutingModule { }
