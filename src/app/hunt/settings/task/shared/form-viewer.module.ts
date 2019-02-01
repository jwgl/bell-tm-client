import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../shared/common-pipes';
import { FormViewerComponent } from './form-viewer.component';
import { TaskFormOverlayComponent } from './overlay/form-overlay.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PipesModule,
        OverlayModule,
    ],
    declarations: [
        FormViewerComponent,
        TaskFormOverlayComponent,
    ],
    exports: [
        FormViewerComponent,
        TaskFormOverlayComponent,
    ],
})
export class TaskFormViewerModule {}
