import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconModule } from 'core/icon';

import { CommonDirectivesModule } from 'core/common-directives';
import { CommonDialogsModule } from 'core/common-dialogs';
import { TmAssetCommonModule } from '../../components/asset-common.module';

import { PlanEditorComponent } from './plan-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        TmAssetCommonModule,
        NgSelectModule,
        IconModule,
    ],
    declarations: [
        PlanEditorComponent,
    ],
    exports: [
        PlanEditorComponent,
    ],
})
export class PlanEditorModule { }
