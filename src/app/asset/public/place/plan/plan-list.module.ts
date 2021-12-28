import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonDirectivesModule } from 'core/common-directives';
import { PlaceFormViewerModule } from 'app/asset/place/shared/form-viewer.module';
import { PlanListComponent } from './plan-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        PlaceFormViewerModule,
        NgSelectModule,
    ],
    declarations: [
        PlanListComponent,
    ],
    exports: [
        PlanListComponent,
    ],
})
export class PlanListModule { }
