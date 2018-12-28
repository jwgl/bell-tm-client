import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { CommonDialogsModule } from 'core/common-dialogs';
import { Dialog } from 'core/dialogs';
import { UploaderModule } from '../../../application/shared/uploader/uploader.module';
import { ProjectSelectModule } from '../../shared/project-select.module';
import { ChangeFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        UploaderModule,
        ProjectSelectModule,
    ],
    declarations: [
        ChangeFormEditorComponent,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        ChangeFormEditorComponent,
    ],
})
export class ChangeFormEditorModule { }
