import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { PaperApprovalItemComponent } from './approval-item.component';
import { PaperApprovalListComponent } from './approval-list.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            PaperApprovalListComponent,
            PaperApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApplicationApprovalRoutingModule {}
