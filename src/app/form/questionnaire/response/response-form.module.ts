import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseFormRoutingModule } from './response-form.routing';
import { ResponseFormEditorModule } from './editor/form-editor.module';
import { ResponseFormFinishModule } from './finish/form-finish.module';
import { ResponseFormService } from './response-form.service';

@NgModule({
    imports: [
        CommonModule,
        ResponseFormRoutingModule,
        ResponseFormEditorModule,
        ResponseFormFinishModule,
    ],
    providers: [
        ResponseFormService,
        { provide: 'RESPONDENT_QUESTIONNAIE_API_URL', useValue: '/api/form/respondents/${userId}/questionnaires' },
    ],
})
export class ResponseFormModule { }
