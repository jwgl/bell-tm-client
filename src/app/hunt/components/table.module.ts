import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';
import { CommonDirectivesModule } from 'core/common-directives';

import { TmGridComponent } from './table.component';
import { SetFilterComponent } from './set-filter.component';
import { HuntGridComponent } from './hunt-grid.component';
import { IconModule } from 'core/icon';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        IconModule,
        AgGridModule.withComponents([SetFilterComponent]),
    ],
    declarations: [
        TmGridComponent,
        SetFilterComponent,
        HuntGridComponent,
    ],
    exports: [
        TmGridComponent,
        HuntGridComponent,
    ],
})
export class TmGridModule { }
