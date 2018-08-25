import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { VisionFormRoutingModule } from './vision-form.routing';
import { VisionFormListModule } from './list/form-list.module';
import { VisionFormItemModule } from './item/form-item.module';
import { VisionFormEditorModule } from './editor/form-editor.module';
import { VisionFormService } from './vision-form.service';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(VisionFormService),
        VisionFormRoutingModule,
        VisionFormListModule,
        VisionFormItemModule,
        VisionFormEditorModule,
    ],
    providers: [
        VisionFormService,
        { provide: 'VISION_FORM_API_URL', useValue: '/api/plan/users/${userId}/visions' },
        { provide: 'DEPARTMENT_VISIONS_URL', useValue: '/api/plan/departments/${departmentId}/visions/latest' },
        { provide: 'VISION_IMPORT_API_URL', useValue: '/api/plan/visions' },
        { provide: 'SCHEMES_PUBLIC_WEB_URL', useValue: '/plan/schemes' },
    ],
})
export class VisionFormModule { }
