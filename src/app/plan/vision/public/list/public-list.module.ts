import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PlanSharedModule } from '../../../shared/module';
import { VisionPublicListComponent } from './public-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PlanSharedModule,
    ],
    declarations: [
        VisionPublicListComponent,
    ],
    exports: [
        VisionPublicListComponent,
    ],
})
export class VisionPublicListModule { }
