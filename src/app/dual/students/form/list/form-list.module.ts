import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { StudentAdminDialog } from '../editor/form-editor.component';
import { QueryDialog } from '../list/query-option.dialog';
import { StudentAdminListComponent } from './form-list.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        StudentAdminListComponent,
        StudentAdminDialog,
        QueryDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        StudentAdminDialog,
        QueryDialog,
    ],
    exports: [
        StudentAdminListComponent,
    ],
})
export class StudentAbroadFormListModule { }
