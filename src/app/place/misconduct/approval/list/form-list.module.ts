import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';

import { MisconductApprovalListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        MisconductApprovalListComponent,
    ],
    exports: [
        MisconductApprovalListComponent,
    ],
})
export class MisconductApprovalListModule { }
