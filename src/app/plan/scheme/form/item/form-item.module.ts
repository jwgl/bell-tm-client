import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { PlanSharedModule } from '../../../shared/module';
import { SchemeInternalViewerModule } from '../../shared/internal-viewer/scheme-viewer.module';
import { SchemeFormItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        PlanSharedModule,
        SchemeInternalViewerModule,
    ],
    declarations: [
        SchemeFormItemComponent,
    ],
    exports: [
        SchemeFormItemComponent,
    ],
})
export class SchemeFormItemModule { }
