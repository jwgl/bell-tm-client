import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { SchemeCheckListComponent } from './check-list.component';
import { SchemeCheckItemComponent } from './check-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            SchemeCheckListComponent,
            SchemeCheckItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class SchemeCheckRoutingModule { }
