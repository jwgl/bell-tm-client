import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDirectivesModule } from 'core/common-directives';
import { IconModule } from 'core/icon';
import { SelectOrOtherComponent } from './select-or-other.component';
import { ModelSelectComponent } from './model-select.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeviceTableComponent } from './device-table.component';
import { PlaceTableComponent } from './place-table.component';
import { TransferFormTableComponent } from './transfer-form-table.component';
import { AssetModelTableComponent } from './asset-model-table.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        IconModule,
        FormsModule,
        NgxDatatableModule,
    ],
    declarations: [
        SelectOrOtherComponent,
        ModelSelectComponent,
        DeviceTableComponent,
        PlaceTableComponent,
        TransferFormTableComponent,
        AssetModelTableComponent,
    ],
    exports: [
        SelectOrOtherComponent,
        ModelSelectComponent,
        DeviceTableComponent,
        PlaceTableComponent,
        TransferFormTableComponent,
        AssetModelTableComponent,
    ],
})
export class TmAssetCommonModule { }
