import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { SchemeInternalViewerModule } from '../shared/internal-viewer/scheme-viewer.module';
import { SchemeReviewComponent } from './scheme-review.component';
import { SchemeReviewRoutingModule } from './scheme-review.routing';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forReview('/api/plan/reviewers/${userId}/schemes', []),
        SchemeReviewRoutingModule,
        SchemeInternalViewerModule,
    ],
    declarations: [
        SchemeReviewComponent,
    ],
})
export class SchemeReviewModule { }
