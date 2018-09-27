import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { ObservationCommonModule } from '../../../../../steer/observation/common/observation-common.module';

import { DeptAdminDialog } from '../editor/form-editor.component';
import { DeptAdminListComponent } from './form-list.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        ObservationCommonModule,
    ],
    declarations: [
        DeptAdminDialog,
        DeptAdminListComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        DeptAdminDialog,
    ],
    exports: [
        DeptAdminListComponent,
    ],
})
export class DeptAdminListModule { }
