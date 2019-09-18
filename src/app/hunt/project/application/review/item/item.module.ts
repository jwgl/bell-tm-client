import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { ProjectFormViewerModule } from '../../form/shared/form-viewer.module';
import { ReviewItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        WorkflowModule,
        ProjectFormViewerModule,
    ],
    declarations: [
        ReviewItemComponent,
    ],
    exports: [
        ReviewItemComponent,
    ],
    providers: [
        Dialog,
    ],
})
export class ReviewItemModule { }
