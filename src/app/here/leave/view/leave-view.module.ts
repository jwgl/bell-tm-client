import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { LeaveSharedModule } from '../shared/leave-shared.module';
import { LeaveViewRoutingModule } from './leave-view.routing';
import { LeaveViewComponent } from './leave-view.component';
import { LeaveViewService } from './leave-view.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule,
        LeaveSharedModule,
        LeaveViewRoutingModule,
    ],
    declarations: [
        LeaveViewComponent,
    ],
    providers: [
        LeaveViewService,
        { provide: 'LEAVE_VIEW_API_URL', useValue: '/api/here/leaves' },
    ],
})
export class LeaveViewModule { }
