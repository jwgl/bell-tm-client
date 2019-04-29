import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { UploaderModule } from '../../../project/application/shared/uploader/uploader.module';
import { TaskFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        UploaderModule,
    ],
    declarations: [
        TaskFormEditorComponent,
    ],
    exports: [
        TaskFormEditorComponent,
    ],
})
export class TaskFormEditorModule { }
