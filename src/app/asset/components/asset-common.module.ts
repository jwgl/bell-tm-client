import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CommonDirectivesModule } from 'core/common-directives';

import { SetFilterComponent } from './set-filter.component';
import { PlaceGridComponent } from './place-grid.component';
import { SelectOrOtherComponent } from './select-or-other.component';
import { ModelSelectComponent } from './model-select.component';
import { DeviceGridComponent } from './device-grid.component';
import { TransferFormGridComponent } from './transfer-form-grid.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeviceTableComponent } from './device-table.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        FormsModule,
        NgxDatatableModule,
        AgGridModule.withComponents([SetFilterComponent]),
    ],
    declarations: [
        SetFilterComponent,
        PlaceGridComponent,
        SelectOrOtherComponent,
        ModelSelectComponent,
        DeviceGridComponent,
        TransferFormGridComponent,
        DeviceTableComponent,
    ],
    exports: [
        PlaceGridComponent,
        SelectOrOtherComponent,
        ModelSelectComponent,
        DeviceGridComponent,
        TransferFormGridComponent,
        DeviceTableComponent,
    ],
})
export class TmAssetCommonModule { }
