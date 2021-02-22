import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { StatementFormRoutingModule } from './statement-form.routing';
import { StatementFormService } from './statement-form.service';
import { StatementFormListModule } from './list/form-list.module';
import { StatementFormItemModule } from './item/form-item.module';
import { StatementFormEditorModule } from './editor/form-editor.module';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(StatementFormService),
        StatementFormRoutingModule,
        StatementFormListModule,
        StatementFormItemModule,
        StatementFormEditorModule,
    ],
    providers: [
        StatementFormService,
        { provide: 'STATEMENT_FORM_API_URL', useValue: '/api/huis/users/${userId}/statementForms' },
        { provide: 'STATEMENT_ITEM_API_URL', useValue: '/api/huis/users/${userId}/statementItems' },
    ],
})
export class StatementFormModule { }
