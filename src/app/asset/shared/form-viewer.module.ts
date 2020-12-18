import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angular2-qrcode';

import { CommonDirectivesModule } from 'core/common-directives';
import { AssetPipesModule } from '../components/pipe/asset-pipes.module';
import { AssetViewerComponent } from './form-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
        AssetPipesModule,
        FormsModule,
        QRCodeModule,
    ],
    declarations: [
        AssetViewerComponent,
    ],
    exports: [
        AssetViewerComponent,
    ],
})
export class AssetViewerModule { }
