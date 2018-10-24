import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { TaskFormViewerModule } from '../shared/form-viewer.module';
import { TaskItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        TaskFormViewerModule,
    ],
    declarations: [
        TaskItemComponent,
    ],
    exports: [
        TaskItemComponent,
    ],
})
export class TaskItemModule { }
