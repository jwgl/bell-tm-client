import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { LeaveFormEditorModule } from './editor/form-editor.module';
import { LeaveFormRoutingModule } from './leave-form.routing';
import { LeaveFormListModule } from './list/form-list.module';
import { LeaveFormItemModule } from './item/form-item.module';
import { LeaveFormService } from './leave-form.service';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(LeaveFormService),
        LeaveFormRoutingModule,
        LeaveFormListModule,
        LeaveFormItemModule,
        LeaveFormEditorModule,
    ],
    providers: [
        LeaveFormService,
        { provide: 'LEAVE_FORM_API_URL', useValue: '/api/here/students/${userId}/leaves' },
    ],
})
export class LeaveFormModule { }
