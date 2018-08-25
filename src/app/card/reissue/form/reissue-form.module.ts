import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReissueFormRoutingModule } from './reissue-form.routing';
import { ReissueFormListModule } from './list/form-list.module';
import { ReissueFormItemModule } from './item/form-item.module';
import { ReissueFormEditorModule } from './editor/form-editor.module';
import { ReissueFormNoticeModule } from './notice/form-notice.module';
import { ReissueFormService } from './reissue-form.service';

@NgModule({
    imports: [
        CommonModule,
        ReissueFormRoutingModule,
        ReissueFormListModule,
        ReissueFormItemModule,
        ReissueFormEditorModule,
        ReissueFormNoticeModule,
    ],
    providers: [
        ReissueFormService,
        { provide: 'CARD_REISSUE_FORM_API_URL', useValue: '/api/card/students/${userId}/reissues' },
    ],
})
export class ReissueFormModule { }
