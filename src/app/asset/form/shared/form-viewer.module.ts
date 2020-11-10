import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonDirectivesModule } from 'core/common-directives';
import { TmAssetCommonModule } from '../../components/asset-common.module';
import { ReceiptFormViewerComponent } from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        TmAssetCommonModule,
    ],
    declarations: [
        ReceiptFormViewerComponent,
    ],
    exports: [
        ReceiptFormViewerComponent,
    ],
})
export class ReceiptFormViewerModule { }
