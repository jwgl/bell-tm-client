import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { Workflow2Module } from 'core/workflow2';

import { OperationSharedModule } from '../../shared/operation-shared.module';
import { OperationFormItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        Workflow2Module,
        OperationSharedModule,
    ],
    declarations: [
        OperationFormItemComponent,
    ],
    exports: [
        OperationFormItemComponent,
    ],
})
export class OperationFormItemModule { }
