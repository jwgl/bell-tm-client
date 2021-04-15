import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TmAssetCommonModule } from '../../components/asset-common.module';
import { HistoryItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TmAssetCommonModule,
    ],
    declarations: [
        HistoryItemComponent,
    ],
    exports: [
        HistoryItemComponent,
    ],
})
export class HistoryItemModule { }
