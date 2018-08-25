import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { SchemeFormRoutingModule } from './scheme-form.routing';
import { SchemeFormListModule } from './list/form-list.module';
import { SchemeFormItemModule } from './item/form-item.module';
import { SchemeFormEditorModule } from './editor/form-editor.module';
import { SchemeFormService } from './scheme-form.service';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(SchemeFormService),
        SchemeFormRoutingModule,
        SchemeFormListModule,
        SchemeFormItemModule,
        SchemeFormEditorModule,
    ],
    providers: [
        SchemeFormService,
        { provide: 'SCHEME_FORM_API_URL', useValue: '/api/plan/users/${userId}/schemes' },
        { provide: 'DEPARTMENT_SCHEMES_API_URL', useValue: '/api/plan/departments/${departmentId}/schemes/latest' },
        { provide: 'DEPARTMENT_DIRECTIONS_API_URL', useValue: '/api/plan/departments/${departmentId}/schemes/directions' },
        { provide: 'SCHEME_IMPORT_API_URL', useValue: '/api/plan/schemes' },
    ],
})
export class SchemeFormModule { }
