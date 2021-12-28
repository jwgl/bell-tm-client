import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { PlanListComponent } from './plan-list.component';
import { PlaceFormViewerModule } from '../../shared/form-viewer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        PlaceFormViewerModule,
        RouterModule,
    ],
    declarations: [
        PlanListComponent,
    ],
    exports: [
        PlanListComponent,
    ],
})
export class PlanListModule { }
