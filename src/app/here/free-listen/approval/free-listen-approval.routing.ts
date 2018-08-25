import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { FreeListenApprovalListComponent } from './approval-list.component';
import { FreeListenApprovalItemComponent } from './approval-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            FreeListenApprovalListComponent,
            FreeListenApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class FreeListenApprovalRoutingModule { }
