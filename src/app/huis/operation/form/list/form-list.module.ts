import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Workflow2Module } from 'core/workflow2';

import { OperationFormListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        Workflow2Module
    ],
    declarations: [
        OperationFormListComponent,
    ],
    exports: [
        OperationFormListComponent,
    ],
})
export class OperationFormListModule { }
