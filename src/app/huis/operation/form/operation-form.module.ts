import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Workflow2Module } from 'core/workflow2';

import { OperationFormRoutingModule } from './operation-form.routing';
import { OperationFormService } from './operation-form.service';
import { OperationFormListModule } from './list/form-list.module';
import { OperationFormItemModule } from './item/form-item.module';
import { OperationFormEditorModule } from './editor/form-editor.module';

@NgModule({
    imports: [
        CommonModule,
        Workflow2Module.forSubmit(OperationFormService),
        OperationFormRoutingModule,
        OperationFormListModule,
        OperationFormItemModule,
        OperationFormEditorModule,
    ],
    providers: [
        OperationFormService,
        { provide: 'OPERATION_FORM_API_URL', useValue: '/api/huis/users/${userId}/operationForms' },
    ],
})
export class OperationFormModule { }
