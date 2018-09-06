import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { PipesModule } from '../../shared/pipes/observation-pipes.module';

import { FormViewComponent } from './form-view.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        PipesModule,
    ],
    declarations: [
        FormViewComponent,
    ],
    exports: [
        FormViewComponent,
    ],
})
export class ObservationLegacyViewerModule { }
