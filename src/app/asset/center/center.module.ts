import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';

import { CenterService } from './center.service';
import { CenterRoutingModule } from './center.routing';
import { CenterListModule } from './list/from-list.module';
import { AssetItemModule } from './item/item.module';
import { AssetEditorDialog } from './item/asset-editor.dialog';

@NgModule({
    imports: [
        CommonModule,
        CenterRoutingModule,
        FormsModule,
        CommonDirectivesModule,
        CenterListModule,
        AssetItemModule,
    ],
    declarations: [
        AssetEditorDialog,
    ],
    entryComponents: [
        AssetEditorDialog,
    ],
    providers: [
        Dialog,
        CenterService,
        { provide: 'CENTER_API_URL', useValue: '/api/asset/users/${userId}/centers' },
    ],
})
export class CenterModule { }
