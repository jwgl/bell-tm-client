import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';
import { Workflow2Module } from 'core/workflow2';

import { StatementFormViewerComponent } from './form-viewer.component';
import { StatementItemViewerComponent } from './item-viewer.component';
import { HuisSharedModule } from '../../shared/huis-shared.module';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        Workflow2Module,
        HuisSharedModule,
    ],
    declarations: [
        StatementFormViewerComponent,
        StatementItemViewerComponent,
    ],
    exports: [
        StatementFormViewerComponent,
        StatementItemViewerComponent,
    ],
    entryComponents: [
        StatementItemViewerComponent,
    ],
})
export class StatementSharedModule { }
