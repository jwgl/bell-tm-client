import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { PaperMentorItemComponent } from './item.component';
import { PaperMentorListComponent } from './list.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            PaperMentorListComponent,
            PaperMentorItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApplicationApprovalRoutingModule { }
