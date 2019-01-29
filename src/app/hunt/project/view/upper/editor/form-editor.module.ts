import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { CommonDialogsModule } from 'core/common-dialogs';
import { Dialog } from 'core/dialogs';
import { ProjectFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        ProjectFormEditorComponent,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        ProjectFormEditorComponent,
    ],
})
export class ProjectFormEditorModule { }
