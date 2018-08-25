import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { ReissueOrderListComponent } from './order-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        ReissueOrderListComponent,
    ],
    exports: [
        ReissueOrderListComponent
    ],
})
export class ReissueOrderListModule { }
