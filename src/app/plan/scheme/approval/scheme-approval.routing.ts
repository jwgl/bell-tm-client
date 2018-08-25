import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { SchemeApprovalListComponent } from './approval-list.component';
import { SchemeApprovalItemComponent } from './approval-item.component';


@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            SchemeApprovalListComponent,
            SchemeApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class SchemeApprovalRoutingModule { }
