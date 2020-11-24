import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { TmAssetCommonModule } from '../../components/asset-common.module';
import { AssetPipesModule } from '../../components/pipe/asset-pipes.module';
import { AreaListComponent } from './form-list.component';
import { AssetOptionDialog } from './asset-option.dialog';
import { CheckoutDialog } from './checkout.dialog';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        TmAssetCommonModule,
        NgSelectModule,
        AssetPipesModule,
    ],
    declarations: [
        AreaListComponent,
        AssetOptionDialog,
        CheckoutDialog,
    ],
    exports: [
        AreaListComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        AssetOptionDialog,
        CheckoutDialog,
    ],
})
export class AreaListModule { }
