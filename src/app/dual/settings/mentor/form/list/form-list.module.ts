import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { MentorFormDialog } from '../editor/form-editor.component';
import { MentorListComponent } from './form-list.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        MentorListComponent,
        MentorFormDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        MentorFormDialog,
    ],
    exports: [
        MentorListComponent,
    ],
})
export class MentorFormListModule { }
