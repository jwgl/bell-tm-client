import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { AgreementFilterDialog } from './filter.dialog';
import { AgreementFormViewerComponent } from './form-viewer.component';
import { UniversitySelectComponent } from './university-select-component';
@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        FormsModule,
    ],
    declarations: [
        AgreementFormViewerComponent,
        AgreementFilterDialog,
        UniversitySelectComponent,
    ],
    entryComponents: [
        AgreementFilterDialog,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        AgreementFormViewerComponent,
        AgreementFilterDialog,
        UniversitySelectComponent,
    ],
})
export class AgreementSharedModule { }
