import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDialogsModule } from 'core/common-dialogs';
import { Workflow2Module } from 'core/workflow2';

import { StatementSharedModule } from '../../shared/statement-shared.module';
import { StatementFormItemComponent } from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDialogsModule,
        Workflow2Module,
        StatementSharedModule,
    ],
    declarations: [
        StatementFormItemComponent,
    ],
    exports: [
        StatementFormItemComponent,
    ],
})
export class StatementFormItemModule { }
