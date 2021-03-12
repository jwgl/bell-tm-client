import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { CommonDirectivesModule } from 'core/common-directives';

import { TmGridComponent } from './table.component';
import { SetFilterComponent } from './set-filter.component';
import { HuntTableComponent } from './hunt-table.component';
import { IconModule } from 'core/icon';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        IconModule,
        NgxDatatableModule,
        AgGridModule.withComponents([SetFilterComponent]),
    ],
    declarations: [
        TmGridComponent,
        SetFilterComponent,
        HuntTableComponent,
    ],
    exports: [
        TmGridComponent,
        HuntTableComponent,
    ],
})
export class TmGridModule { }
