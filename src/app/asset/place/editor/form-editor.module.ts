import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CommonDirectivesModule } from 'core/common-directives';
import { CommonDialogsModule } from 'core/common-dialogs';
import { TmAssetCommonModule } from '../../components/asset-common.module';

import { PlaceFormEditorComponent } from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        TmAssetCommonModule,
        NgSelectModule,
    ],
    declarations: [
        PlaceFormEditorComponent,
    ],
    exports: [
        PlaceFormEditorComponent,
    ],
})
export class PlaceFormEditorModule { }
