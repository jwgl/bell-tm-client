import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';

import { FreeListenViewRoutingModule } from './free-listen-view.routing';
import { FreeListenSharedModule } from '../shared/free-listen-shared.module';
import { FreeListenViewComponent } from './free-listen-view.component';
import { FreeListenViewService } from './free-listen-view.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        WorkflowModule,
        FreeListenSharedModule,
        FreeListenViewRoutingModule,
    ],
    declarations: [
        FreeListenViewComponent,
    ],
    providers: [
        FreeListenViewService,
        { provide: 'FREE_LISTEN_VIEW_API_URL', useValue: '/api/here/freeListens' },
    ],
})
export class FreeListenViewModule { }
