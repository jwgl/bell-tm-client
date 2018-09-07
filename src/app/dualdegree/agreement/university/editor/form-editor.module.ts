import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { UniversityFormEditorComponent } from './form-editor.component';
import { MajorDialog } from './major-item/major.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        UniversityFormEditorComponent,
        MajorDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        MajorDialog,
    ],
    exports: [
        UniversityFormEditorComponent,
    ],
})
export class UniversityFormEditorModule { }
