import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule, } from 'core/workflow';

import { PipesModule } from '../../../settings/shared/common-pipes';
import { ChangeFormViewerModule } from '../form/shared/form-viewer.module';
import { InfoChangeReviewRoutingModule } from './info-change-review.routing';
import { InfoChangeReviewListComponent } from './review-list.component';
import { InfoChangeReviewItemComponent } from './review-item.component';
import { ReviewService } from './review.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/hunt/directors/${userId}/infoChanges', [
            { type: 'todo', label: '待签', dateLabel: '审核时间' },
            { type: 'done', label: '已签', dateLabel: '加签时间' },
        ]),
        InfoChangeReviewRoutingModule,
        PipesModule,
        ChangeFormViewerModule,
    ],
    declarations: [
        InfoChangeReviewListComponent,
        InfoChangeReviewItemComponent,
    ],
    providers: [
        ReviewService,
        { provide: 'REVIEW_API_URL', useValue: '/api/hunt/directors/${userId}/infoChanges' },
    ],
})
export class ChangeReviewModule { }
