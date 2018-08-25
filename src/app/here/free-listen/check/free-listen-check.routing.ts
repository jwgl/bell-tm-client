import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { FreeListenCheckListComponent } from './check-list.component';
import { FreeListenCheckItemComponent } from './check-item.component';
import { FreeListenCheckResolve } from './free-listen-check.resolve';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            FreeListenCheckListComponent,
            FreeListenCheckItemComponent,
            FreeListenCheckResolve,
        )),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        FreeListenCheckResolve,
    ]
})
export class FreeListenCheckRoutingModule { }
