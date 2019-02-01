import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Dialog } from 'core/dialogs';
import { WorkflowModule } from 'core/workflow';

import { ChangeFormViewerModule } from '../shared/form-viewer.module';
import { ChangeItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        WorkflowModule,
        ChangeFormViewerModule,
    ],
    declarations: [
        ChangeItemComponent,
    ],
    exports: [
        ChangeItemComponent,
    ],
    providers: [
        Dialog,
    ],
})
export class ChangeFormItemModule { }
