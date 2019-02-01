import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { ProjectFormViewerModule } from '../shared/form-viewer.module';
import { ProjectItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        WorkflowModule,
        ProjectFormViewerModule,
    ],
    declarations: [
        ProjectItemComponent,
    ],
    exports: [
        ProjectItemComponent,
    ],
    providers: [
        Dialog,
    ],
})
export class ProjectFormItemModule { }
