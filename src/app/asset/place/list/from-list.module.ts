import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonDirectivesModule } from 'core/common-directives';
import { TmAssetCommonModule } from '../../components/asset-common.module';
import { PlaceListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        TmAssetCommonModule,
        NgxDatatableModule,
    ],
    declarations: [
        PlaceListComponent,
    ],
    exports: [
        PlaceListComponent,
    ],
})
export class PlaceListModule { }
