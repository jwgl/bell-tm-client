import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { CommonDialogsModule } from 'core/common-dialogs';
import { PlanItemComponent } from './plan-item.component';
import { PlanViewerModule } from 'app/asset/place/plan/shared/form-viewer.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        PlanViewerModule,
    ],
    declarations: [
        PlanItemComponent,
    ],
    exports: [
        PlanItemComponent,
    ],
})
export class PlanItemModule { }
