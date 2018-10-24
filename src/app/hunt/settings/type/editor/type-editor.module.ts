import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { CommonDialogsModule } from 'core/common-dialogs';
import { Dialog } from 'core/dialogs';

import { TypeEditorDialog } from './type-dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        TypeEditorDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        TypeEditorDialog,
    ],
    exports: [
        TypeEditorDialog,
    ],
})
export class TypeEditorModule { }
