import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonDirectivesModule } from 'core/common-directives';
import { PlanViewerComponent } from './form-viewer.component';
import { PlaceFormViewerModule } from '../../shared/form-viewer.module';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        PlaceFormViewerModule,
    ],
    declarations: [
        PlanViewerComponent,
    ],
    exports: [
        PlanViewerComponent,
    ],
})
export class PlanViewerModule { }
