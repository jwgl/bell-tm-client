import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowModule } from 'core/workflow';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { UploaderModule } from '../../../shared/uploader/uploader.module';
import { AwardFormViewerModule } from '../../shared/form-viewer.module';

import { ApplicationFormEditorModule } from './editor/form-editor.module';
import { MaterialUploaderDialog } from './editor/uploader.dialog';
import { ApplicationRoutingModule } from './form-routing.module';
import { ApplicationFormService } from './form.service';
import { AwardItemComponent } from './item/award-item.component';
import { AwardViewService } from './item/award.service';
import { ApplicationFormItemModule } from './item/item.module';
import { AwardListModule } from './list/form-list.module';

@NgModule({
    imports: [
        CommonModule,
        WorkflowModule.forSubmit(ApplicationFormService),
        CommonDialogsModule,
        CommonDirectivesModule,
        ApplicationRoutingModule,
        AwardFormViewerModule,
        ApplicationFormItemModule,
        UploaderModule,
        ApplicationFormEditorModule,
        AwardListModule,
    ],
    declarations: [
        AwardItemComponent,
        MaterialUploaderDialog,
    ],
    providers: [
        Dialog,
        ApplicationFormService,
        AwardViewService,
        { provide: 'APPLICATION_API_URL', useValue: '/api/dual/students/${userId}/applications' },
        { provide: 'AWARD_API_URL', useValue: '/api/dual/awards' },
    ],
    entryComponents: [
        MaterialUploaderDialog,
    ],
})
export class ApplicationFormModule { }
