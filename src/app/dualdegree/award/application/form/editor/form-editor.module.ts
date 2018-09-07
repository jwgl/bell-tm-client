import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {CommonDirectivesModule} from 'core/common-directives';
import {CommonDialogsModule} from 'core/common-dialogs';
import {Dialog} from 'core/dialogs';

import {ApplicationFormEditorComponent} from './form-editor.component';
import {UploaderDialog} from './uploader.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        ApplicationFormEditorComponent,
        UploaderDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        UploaderDialog,
    ],
    exports: [
        ApplicationFormEditorComponent,
    ],
})
export class AwardFormEditorModule { }
