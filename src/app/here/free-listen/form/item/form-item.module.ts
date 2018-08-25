import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { WorkflowModule } from 'core/workflow';

import { FreeListenSharedModule } from '../../shared/free-listen-shared.module';
import { FreeListenFormItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        WorkflowModule,
        FreeListenSharedModule,
    ],
    declarations: [
        FreeListenFormItemComponent,
    ],
    exports: [
        FreeListenFormItemComponent,
    ],
})
export class FreeListenFormItemModule { }
