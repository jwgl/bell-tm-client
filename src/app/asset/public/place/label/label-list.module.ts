import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonDirectivesModule } from 'core/common-directives';
import { TmAssetCommonModule } from '../../../components/asset-common.module';
import { LabelListComponent } from './label-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        TmAssetCommonModule,
        NgSelectModule,
    ],
    declarations: [
        LabelListComponent,
    ],
    exports: [
        LabelListComponent,
    ],
})
export class LabelListModule { }
