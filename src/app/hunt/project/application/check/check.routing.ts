import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { ApplicationCheckItemComponent } from './check-item.component';
import { ApplicationCheckListComponent } from './check-list.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            ApplicationCheckListComponent,
            ApplicationCheckItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class ApplicationCheckRoutingModule {}
