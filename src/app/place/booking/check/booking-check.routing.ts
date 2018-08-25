import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { buildWorkflowRoutings } from 'core/workflow';

import { BookingCheckListComponent } from './check-list.component';
import { BookingCheckItemComponent } from './check-item.component';

@NgModule({
    imports: [
        RouterModule.forChild(buildWorkflowRoutings(
            BookingCheckListComponent,
            BookingCheckItemComponent,
        )),
    ],
    exports: [
        RouterModule,
    ],
})
export class BookingCheckRoutingModule { }
