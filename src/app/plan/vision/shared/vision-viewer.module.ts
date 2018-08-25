import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { PlanSharedModule } from '../../shared/module';
import { VisionViewerComponent } from './vision-viewer.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PlanSharedModule,
        CommonDirectivesModule,
    ],
    declarations: [
        VisionViewerComponent,
    ],
    exports: [
        VisionViewerComponent,
    ],
})
export class VisionViewerModule { }
