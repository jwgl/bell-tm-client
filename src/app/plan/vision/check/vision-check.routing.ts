import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { VisionCheckItemComponent } from './check-item.component';
import { VisionCheckListComponent } from './check-list.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            VisionCheckListComponent,
            VisionCheckItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class VisionCheckRoutingModule { }
