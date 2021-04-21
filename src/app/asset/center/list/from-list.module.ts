import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { CommonDialogsModule } from 'core/common-dialogs';

import { TmAssetCommonModule } from '../../components/asset-common.module';
import { AssetPipesModule } from '../../components/pipe/asset-pipes.module';
import { CenterListComponent } from './form-list.component';
import { AssetOptionDialog } from './asset-option.dialog';
import { AssetUpdatetDialog } from './asset-update.dialog';
import { TransferDialog } from './transfer.dialog';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        TmAssetCommonModule,
        NgSelectModule,
        AssetPipesModule,
    ],
    declarations: [
        CenterListComponent,
        AssetOptionDialog,
        AssetUpdatetDialog,
        TransferDialog,
    ],
    exports: [
        CenterListComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        AssetOptionDialog,
        AssetUpdatetDialog,
        TransferDialog,
    ],
})
export class CenterListModule { }
