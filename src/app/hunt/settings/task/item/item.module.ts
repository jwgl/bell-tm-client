import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { WorkflowModule } from 'core/workflow';
import { Dialog } from 'core/dialogs';

import { PipesModule } from '../../shared/common-pipes';
import { TaskFormViewerModule } from '../shared/form-viewer.module';
import { TaskItemComponent } from './item.component';
import { ProjectSelectComponent } from './project-select.component';
import { ProjectOptionDialog } from './project-option.dialog';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        TaskFormViewerModule,
        FormsModule,
        CommonDirectivesModule,
        NgSelectModule,
        PipesModule,
    ],
    declarations: [
        TaskItemComponent,
        ProjectSelectComponent,
        ProjectOptionDialog,
    ],
    exports: [
        TaskItemComponent,
        ProjectSelectComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        ProjectOptionDialog,
    ],
})
export class TaskItemModule { }
