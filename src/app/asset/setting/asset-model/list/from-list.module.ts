import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { TmAssetCommonModule } from '../../../components/asset-common.module';

import { AssetModelListComponent } from './form-list.component';
import { AssetModelDialog } from './form-editor.dialog';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CommonDirectivesModule,
        TmAssetCommonModule,
    ],
    declarations: [
        AssetModelListComponent,
        AssetModelDialog,
    ],
    providers: [
        Dialog,
    ],
    exports: [
        AssetModelListComponent,
    ],
    entryComponents: [
        AssetModelDialog,
    ],
})
export class AssetModelListModule { }
