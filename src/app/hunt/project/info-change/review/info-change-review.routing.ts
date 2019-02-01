import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { InfoChangeReviewListComponent } from './review-list.component';
import { InfoChangeReviewItemComponent } from './review-item.component';


@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            InfoChangeReviewListComponent,
            InfoChangeReviewItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class InfoChangeReviewRoutingModule { }
