import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { CommonDialogsModule } from 'core/common-dialogs';
import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';
import { UploaderModule } from '../../../application/shared/uploader/uploader.module';
import { ChangeFormViewerModule } from '../../../info-change/form/shared/form-viewer.module';
import { PipesModule } from '../../../../settings/shared/common-pipes';
import { ChangeFormEditorComponent } from './form-editor.component';
import { ChangeItemComponent } from './form-item.component';
import { ChangeListComponent } from './form-list.component';
import { TerminateComponent } from './terminate.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        UploaderModule,
        WorkflowModule,
        ChangeFormViewerModule,
        PipesModule,
    ],
    declarations: [
        ChangeFormEditorComponent,
        ChangeItemComponent,
        ChangeListComponent,
        TerminateComponent,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        ChangeFormEditorComponent,
        TerminateComponent,
    ],
    entryComponents: [
        TerminateComponent,
    ],
})
export class ChangeFormModule { }
