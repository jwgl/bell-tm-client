import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { VisionViewerModule } from '../shared/vision-viewer.module';
import { VisionReviewComponent } from './vision-review.component';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forReview('/api/plan/reviewers/${userId}/visions', []),
        VisionViewerModule,
    ],
    declarations: [
        VisionReviewComponent,
    ],
    providers: [
        { provide: 'SCHEMES_PUBLIC_WEB_URL', useValue: '/plan/schemes' },
    ],
})
export class VisionReviewModule { }
