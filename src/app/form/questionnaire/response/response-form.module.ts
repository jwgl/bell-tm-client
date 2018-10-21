import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseFormRoutingModule } from './response-form.routing';
import { ResponseFormService } from './response-form.service';
import { ResponseFormEditorModule } from './editor/form-editor.module';

@NgModule({
    imports: [
        CommonModule,
        ResponseFormRoutingModule,
        ResponseFormEditorModule,
    ],
    providers: [
        ResponseFormService,
        { provide: 'RESPONDENT_QUESTIONNAIE_API_URL', useValue: '/api/form/respondents/${userId}/questionnaires' },
    ],
})
export class ResponseFormModule { }
