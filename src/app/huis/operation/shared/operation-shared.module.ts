import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Workflow2Module } from 'core/workflow2';

import { OperationFormViewerComponent } from './form-viewer.component';
import { HuisSharedModule } from '../../shared/huis-shared.module';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        Workflow2Module,
        HuisSharedModule,
    ],
    declarations: [
        OperationFormViewerComponent,
    ],
    exports: [
        OperationFormViewerComponent,
    ],
})
export class OperationSharedModule { }
