import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {UploaderModule} from '../../../shared/uploader/uploader.module';
import {AwardFormViewerModule} from '../../shared/form-viewer.module';

import {AwardFormEditorModule} from './editor/form-editor.module';
import {UploaderDialog} from './editor/uploader.dialog';
import {ApplicationRoutingModule} from './form-routing.module';
import {ApplicationFormService} from './form.service';
import {AwardItemComponent} from './item/award-item.component';
import {AwardViewService} from './item/award.service';
import {ApplicationFormItemModule} from './item/item.module';
import {AwardListModule} from './list/form-list.module';
import {PaperFormService} from './paper-form.service';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        ApplicationRoutingModule,
        AwardFormViewerModule,
        ApplicationFormItemModule,
        UploaderModule,
        AwardFormEditorModule,
        AwardListModule,
    ],
    declarations: [
        AwardItemComponent,
        UploaderDialog,
    ],
    providers: [
        Dialog,
        ApplicationFormService,
        AwardViewService,
        PaperFormService,
        {provide: 'APPLICATION_API_URL', useValue: '/api/dualdegree/students/${userId}/applications'},
        {provide: 'AWARD_API_URL', useValue: '/api/dualdegree/awards'},
    ],
    entryComponents: [
        UploaderDialog,
    ],
})
export class ApplicationFormModule { }
