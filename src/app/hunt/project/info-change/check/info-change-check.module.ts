import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { PipesModule } from '../../../settings/shared/common-pipes';
import { ChangeFormViewerModule } from '../form/shared/form-viewer.module';
import { InfoChangeCheckRoutingModule } from './info-change-check.routing';
import { InfoChangeCheckListComponent } from './check-list.component';
import { InfoChangeCheckItemComponent } from './check-item.component';
import { CheckService } from './check.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/hunt/checkers/${userId}/infoChanges', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'done', label: '已审核', dateLabel: '审核时间' },
        ]),
        InfoChangeCheckRoutingModule,
        ChangeFormViewerModule,
        PipesModule,
    ],
    declarations: [
        InfoChangeCheckListComponent,
        InfoChangeCheckItemComponent,
    ],
    providers: [
        CheckService,
        { provide: 'CHECK_API_URL', useValue: '/api/hunt/checkers/${userId}/infoChanges' },
    ],
})
export class ChangeCheckModule { }
