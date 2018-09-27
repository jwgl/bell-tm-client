import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { AwardFormViewerModule } from '../../shared/form-viewer.module';
import { AwardItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        AwardFormViewerModule,
    ],
    declarations: [
        AwardItemComponent,
    ],
    exports: [
        AwardItemComponent,
    ],
})
export class AwardItemModule { }
