import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { InfoChangeApprovalListComponent } from './approval-list.component';
import { InfoChangeApprovalItemComponent } from './approval-item.component';


@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            InfoChangeApprovalListComponent,
            InfoChangeApprovalItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class InfoChangeApprovalRoutingModule { }
