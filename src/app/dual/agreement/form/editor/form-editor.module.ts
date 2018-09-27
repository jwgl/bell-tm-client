import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { AgreementSharedModule } from '../../shared/agreement-shared.module';
import { AgreementFormEditorComponent } from './form-editor.component';
import { MajorDialog } from './major-item/major.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        AgreementSharedModule,
    ],
    declarations: [
        AgreementFormEditorComponent,
        MajorDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        MajorDialog,
    ],
    exports: [
        AgreementFormEditorComponent,
    ],
})
export class AgreementFormEditorModule { }
