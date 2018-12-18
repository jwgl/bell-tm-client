import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { UploaderModule } from '../../../application/shared/uploader/uploader.module';
import { InspectDialog } from './inspect.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        UploaderModule,
    ],
    declarations: [
        InspectDialog,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        InspectDialog,
    ],
    entryComponents: [
        InspectDialog,
    ],
})
export class InspectModule { }
