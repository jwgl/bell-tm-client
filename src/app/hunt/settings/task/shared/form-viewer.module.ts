import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../shared/common-pipes';
import { FormViewerComponent } from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PipesModule,
    ],
    declarations: [
        FormViewerComponent,
    ],
    exports: [
        FormViewerComponent,
    ],
})
export class TaskFormViewerModule {}
