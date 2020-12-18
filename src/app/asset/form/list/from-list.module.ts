import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { TmAssetCommonModule } from '../../components/asset-common.module';
import { ReceiptFormListComponent } from './form-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        TmAssetCommonModule,
    ],
    declarations: [
        ReceiptFormListComponent,
    ],
    exports: [
        ReceiptFormListComponent,
    ],
})
export class ReceiptFormListModule { }
