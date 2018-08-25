import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { PlanSharedModule } from '../../../shared/module';
import { SchemeInternalViewerModule } from '../../shared/internal-viewer/scheme-viewer.module';
import { SchemeDepartmentItemComponent } from './department-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PlanSharedModule,
        CommonDialogsModule,
        WorkflowModule,
        SchemeInternalViewerModule,
    ],
    declarations: [
        SchemeDepartmentItemComponent,
    ],
    exports: [
        SchemeDepartmentItemComponent,
    ],
})
export class SchemeDepartmentItemModule { }
