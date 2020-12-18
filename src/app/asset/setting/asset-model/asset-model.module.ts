import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetModelRoutingModule } from './asset-model.routing';
import { AssetModelService } from './asset-model.service';
import { AssetModelListModule } from './list/from-list.module';

@NgModule({
    imports: [
        CommonModule,
        AssetModelRoutingModule,
        AssetModelListModule,
    ],
    providers: [
        AssetModelService,
        { provide: 'MODEL_API_URL', useValue: '/api/asset/models' },
    ],
})
export class AssetModelModule { }
