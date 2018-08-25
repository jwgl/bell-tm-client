import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { PlanSharedModule } from '../../shared/module';
import { VisionViewerModule } from '../shared/vision-viewer.module';
import { VisionCheckRoutingModule } from './vision-check.routing';
import { VisionCheckListComponent } from './check-list.component';
import { VisionCheckItemComponent } from './check-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/plan/checkers/${userId}/visions', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'done', label: '已审核', dateLabel: '审核时间' },
        ]),
        VisionCheckRoutingModule,
        PlanSharedModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionCheckListComponent,
        VisionCheckItemComponent,
    ],
    providers: [
        { provide: 'SCHEMES_PUBLIC_WEB_URL', useValue: '/plan/schemes' },
    ],
})
export class VisionCheckModule { }
