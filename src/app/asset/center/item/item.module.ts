import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AssetViewerModule } from '../../shared/form-viewer.module';
import { AssetItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AssetViewerModule,
    ],
    declarations: [
        AssetItemComponent,
    ],
    exports: [
        AssetItemComponent,
    ],
})
export class AssetItemModule { }
