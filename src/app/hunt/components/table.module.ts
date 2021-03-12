import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonDirectivesModule } from 'core/common-directives';

import { TmGridComponent } from './table.component';
import { HuntTableComponent } from './hunt-table.component';
import { IconModule } from 'core/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        IconModule,
        NgxDatatableModule,
    ],
    declarations: [
        TmGridComponent,
        HuntTableComponent,
    ],
    exports: [
        TmGridComponent,
        HuntTableComponent,
    ],
})
export class TmGridModule { }
