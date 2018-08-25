import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { PlanSharedModule } from '../../shared/module';
import { SchemeInternalViewerModule } from '../shared/internal-viewer/scheme-viewer.module';
import { SchemeSharedModule } from '../shared/scheme.module';
import { SchemeCheckRoutingModule } from './scheme-check.routing';
import { SchemeCheckListComponent } from './check-list.component';
import { SchemeCheckItemComponent } from './check-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/plan/checkers/${userId}/schemes', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'done', label: '已审核', dateLabel: '审核时间' },
        ]),
        SchemeCheckRoutingModule,
        PlanSharedModule,
        SchemeInternalViewerModule,
        SchemeSharedModule,
    ],
    declarations: [
        SchemeCheckListComponent,
        SchemeCheckItemComponent,
    ],
})
export class SchemeCheckModule { }
