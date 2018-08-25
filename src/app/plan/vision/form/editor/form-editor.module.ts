import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CommonDialogsModule } from 'core/common-dialogs';

import { PlanSharedModule } from '../../../shared/module';
import { VisionFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        PlanSharedModule,
        CommonDialogsModule,
    ],
    declarations: [
        VisionFormEditorComponent,
    ],
    exports: [
        VisionFormEditorComponent,
    ],
})
export class VisionFormEditorModule { }
