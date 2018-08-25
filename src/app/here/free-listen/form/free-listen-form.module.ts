import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { FreeListenFormRoutingModule } from './free-listen-form.routing';
import { FreeListenFormListModule } from './list/form-list.module';
import { FreeListenFormItemModule } from './item/form-item.module';
import { FreeListenFormEditorModule } from './editor/form-editor.module';
import { FreeListenFormService } from './free-listen-form.service';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(FreeListenFormService),
        FreeListenFormRoutingModule,
        FreeListenFormListModule,
        FreeListenFormItemModule,
        FreeListenFormEditorModule,
    ],
    providers: [
        FreeListenFormService,
        { provide: 'FREE_LISTEN_FORM_API_URL', useValue: '/api/here/students/${userId}/freeListens' },
        { provide: 'FREE_LISTEN_VIEW_API_URL', useValue: '/api/here/freeListens' },
    ],
})
export class FreeListenFormModule { }
