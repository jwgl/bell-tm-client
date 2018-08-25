import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { FreeListenSharedModule } from '../shared/free-listen-shared.module';
import { FreeListenCheckRoutingModule } from './free-listen-check.routing';
import { FreeListenCheckListComponent } from './check-list.component';
import { FreeListenCheckItemComponent } from './check-item.component';
import { FreeListenCheckService } from './free-listen-check.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule.forReview('/api/here/teachers/${userId}/freeListens', [
            { type: 'todo', label: '待审核', dateLabel: '申请时间' },
            { type: 'expr', label: '已过期', dateLabel: '申请时间' },
            { type: 'done', label: '已审核', dateLabel: '审核时间' },
        ]),
        FreeListenSharedModule,
        FreeListenCheckRoutingModule,
    ],
    declarations: [
        FreeListenCheckListComponent,
        FreeListenCheckItemComponent,
    ],
    providers: [
        { provide: 'FREE_LISTEN_VIEW_API_URL', useValue: '/api/here/freeListens' },
        FreeListenCheckService,
    ],
})
export class FreeListenCheckModule { }
