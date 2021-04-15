import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';
import { Dialog } from 'core/dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { TmAssetCommonModule } from '../../components/asset-common.module';
import { AssetPipesModule } from '../../components/pipe/asset-pipes.module';
import { CartItemsComponent } from './form-list.component';
import { CartNameDialog } from './cart-name.dialog';

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
        CartItemsComponent,
        CartNameDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        CartNameDialog,
    ],
    exports: [
        CartItemsComponent,
    ],
})
export class CartItemsModule { }
