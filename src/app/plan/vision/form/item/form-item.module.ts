import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { PlanSharedModule } from '../../../shared/module';
import { VisionViewerModule } from '../../shared/vision-viewer.module';
import { VisionFormItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        PlanSharedModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionFormItemComponent,
    ],
    exports: [
        VisionFormItemComponent,
    ],
})
export class VisionFormItemModule { }
