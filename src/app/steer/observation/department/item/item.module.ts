import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonDirectivesModule } from 'core/common-directives';

import { ObservationFormViewerModule } from '../../form/shared/form-viewer.module';
import { PipesModule } from '../../shared/pipes/observation-pipes.module';

import { DeanItemComponent } from './item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
        PipesModule,
        ObservationFormViewerModule,
    ],
    declarations: [
        DeanItemComponent,
    ],
    exports: [
        DeanItemComponent,
    ],
})
export class DeanItemModule { }
