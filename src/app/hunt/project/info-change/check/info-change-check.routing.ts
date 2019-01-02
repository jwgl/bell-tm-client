import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { InfoChangeCheckListComponent } from './check-list.component';
import { InfoChangeCheckItemComponent } from './check-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            InfoChangeCheckListComponent,
            InfoChangeCheckItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class InfoChangeCheckRoutingModule { }
