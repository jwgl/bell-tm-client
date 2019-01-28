import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { ProjectFormViewerModule } from '../../../application/form/shared/form-viewer.module';
import { ProjectItemComponent } from './project-item.component';
import { ProjectMemoDialog } from './memo.dialog';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ProjectFormViewerModule,
        CommonDirectivesModule,
    ],
    declarations: [
        ProjectItemComponent,
        ProjectMemoDialog,
    ],
    exports: [
        ProjectItemComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        ProjectMemoDialog,
    ],
})
export class ProjectItemModule { }
